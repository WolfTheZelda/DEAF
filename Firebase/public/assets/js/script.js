// Vue - Start
var Vue = new Vue({
  el: "#app",
  data: {
    Page: location.pathname.split("/").slice(-1)[0].replace(".html", ""),
    AdminPage: "menu",

    HasLogin: false,
    HasWrite: false,
    UserId: "",
    UserName: "Usuário",
    UserNumber: "Telefone",
    UserNote: "∞",
    UserGroup: "Grupo",
    VideoRandom: "https://www.youtube.com/embed?listType=playlist&list=PLwxNMb28XmpeypJMHfNbJ4RAFkRtmAN3P&fs=0&rel=0&showinfo=0&showsearch=0&controls=0&modestbranding=0&autohide=1&autoplay=0&loop=1&disablekb=1&cc_load_policy=1&iv_load_policy=3&cc_lang_pref=pt&origin=https://acaofilosofica.com&index=" + Math.floor((Math.random() * 34)),
    UserText: "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>"
  }
});
// Vue - End

// Materialize - Start
M.AutoInit();
// Materialize - End

// Firebase - Start
LoginChecar();

const Performance = firebase.performance();

const Storage = firebase.storage().ref();
const Database = firebase.database().ref();

const AlunoPagina = document.getElementById("aluno");
const Alunos = document.getElementById("alunos");
const AlunosDados = Database.child("alunos");
const AlunosLista = document.getElementById("alunos-lista");

const AdministradorPagina = document.getElementById("administrador");
const AdministradoresPagina = document.getElementById("administradores");
const AdministradoresDados = Database.child("administradores");
const AdministradoresLista = document.getElementById("administradores-lista");

const REGISTROS_DATABASE = Database.child("registros");
const REGISTROS_LIST = document.getElementById("registros-lista");

const PostagensDados = Database.child("postagens");
const PostagensLista = document.getElementById("postagens-lista");

const GalleryImage = "/assets/image/gallery.webp",
  LoadingImage = "/assets/image/loading.webp";

const editor = document.getElementById('editor') !== null ? new Quill('#editor', {
  theme: 'snow'
}) : "";

const administrador_editor = document.getElementById('administrador-editor') !== null ? new Quill('#administrador-editor', {
  theme: 'snow'
}) : "";

if (document.getElementById('administrador-editor') !== null) {
  administrador_editor.root.innerHTML = "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";
}
const aluno_editor = document.getElementById('aluno-editor') !== null ? new Quill('#aluno-editor', {
  theme: 'snow'
}) : "";

if (document.getElementById('aluno-editor') !== null) {
  aluno_editor.root.innerHTML = "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";
}

function EnviarArquivo(Input, Img, Path) {
  Img = document.getElementById(Img);

  let OldLink = Img.src;
  OldLink = OldLink.substring(OldLink.indexOf("/assets"), OldLink.lastIndexOf(""));

  Img.src = LoadingImage;

  let Arquivo = document.getElementById(Input).files[0];
  let Nome = Database.child(Path).push().key;

  let MetaData = {
    contentType: Arquivo.type
  };

  let Task = Storage.child(Path + Nome).put(Arquivo, MetaData);

  Task
    .then(Snap => Snap.ref.getDownloadURL())
    .then((URL) => {
      Img.src = URL;

      if (OldLink != GalleryImage && OldLink != LoadingImage) {
        let DeletePath = firebase.storage().refFromURL(OldLink);

        DeletePath.delete().then(function () {
          // Deletado com sucesso
        }).catch(function (Error) {
          console.error(Error);
        });
      }
    })
    .catch(Error => {
      Img.src = OldLink;

      Notificacao("Usuário sem permissão para modificação de arquivos");

      console.error(Error);
    });
}

function ModificarKey(Element, Key) {
  document.querySelector(Element).setAttribute("data-key", Key);
}

function ModificarSource(Element, Source) {
  document.querySelector(Element).src = Source;
}

function ResetarForm(Element) {
  document.querySelector(Element).reset();
}

function ResetarSelect(Element, Child, Condition) {
  if (document.querySelector(Element).value != Condition) {
    for (i = 1; i < Child; i++) {
      document.querySelector(Element).childNodes[i].removeAttribute("disabled");
    }

    document.querySelector(Element).childNodes[Child].setAttribute("disabled", "");
  }
}

function TabelaRegistros() {
  REGISTROS_DATABASE.on("child_added", Snap => {
    DestroyTable();

    ListarRegistro(Snap);

    CreateTable();
  });

  REGISTROS_DATABASE.on("child_changed", Snap => {
    DestroyTable();

    RemoverLinha(Snap);
    ListarRegistro(Snap);

    CreateTable();
  });
  REGISTROS_DATABASE.on("child_removed", Snap => {
    DestroyTable();

    RemoverLinha(Snap);

    CreateTable();
  });
}

REGISTROS_DATABASE.endAt().limitToLast(1).on("child_added", Snap => {
  ChecarTimestamp(Snap);
  // CreateTable();
});

function TabelaAlunos() {
  AlunosDados.on("child_added", Snap => {
    DestroyTable();

    ListarAluno(Snap);

    CreateTable();
  });

  AlunosDados.on("child_changed", Snap => {
    DestroyTable();

    RemoverLinha(Snap);
    ListarAluno(Snap);

    CreateTable();
  });

  AlunosDados.on("child_removed", Snap => {
    DestroyTable();

    RemoverLinha(Snap);

    CreateTable();
  });
}

function ListarRegistro(Snap) {
  let Aluno = Snap.val();

  let StringHTML =
    '<tr data-key=\'' + Snap.key + '\'>' +
    '<td>' + Aluno.timestamp + '</td>' +
    '<td>' + Aluno.registro + '</td>' +
    '<td>' + new Date(Aluno.timestamp).toLocaleString() + '</td>' +
    '</tr>';

  REGISTROS_LIST.innerHTML += StringHTML;
}

function ListarAluno(Snap) {
  let Aluno = Snap.val();

  let StringHTML = '<tr data-key=\'' + Snap.key + '\'>' +
    '<td>' + Aluno.nome + '</td>' +
    '<td>' + Aluno.ano + '</td>' +
    '<td>' + Aluno.colegio + '</td>' +
    '<td>' + Aluno.grupo + '</td>' +
    '<td>' + Aluno.nota + '</td>' +
    '<td><a class=\'btn waves-effect waves-light green\' href=\'https://wa.me/' + Snap.key.replace("+", "") + '\' target=\'_blank\'>' + Snap.key + '</a></td>' +
    '<td><button data-key=\'' + Snap.key + '\' class=\'btn waves-effect waves-light blue aluno-mostrar-button\'>Mostrar</button></td>' +
    '<td><button data-key=\'' + Snap.key + '\' data-path=\'/alunos/\' class=\'btn waves-effect waves-light red aluno-deletar-button\'>Deletar</button></td>' +
    '</tr>';

  AlunosLista.innerHTML += StringHTML;
}

function ListarAdministrador(Snap) {
  let Aluno = Snap.val();

  let disabled_button = 'enabled';
  switch (Aluno.grupo) {
    case "Desenvolvedor":
      disabled_button = 'disabled';
      break;
    case "Orientador":
      disabled_button = 'enabled';
      break;
    default:
      disabled_button = 'enabled';
      break;
  }

  let StringHTML = '<tr data-key=\'' + Snap.key + '\'>' +
    '<td>' + Aluno.nome + '</td>' +
    '<td>' + Aluno.ano + '</td>' +
    '<td>' + Aluno.colegio + '</td>' +
    '<td>' + Aluno.grupo + '</td>' +
    '<td>' + Aluno.nota + '</td>' +
    '<td><a class=\'btn waves-effect waves-light green\' href=\'https://wa.me/' + Snap.key.replace("+", "") + '\' target=\'_blank\'>' + Snap.key + '</a></td>' +
    '<td><button data-key=\'' + Snap.key + '\' class=\'btn waves-effect waves-light blue administrador-mostrar-button\'>Mostrar</button></td>' +
    '<td><button data-key=\'' + Snap.key + '\' data-path=\'/administradores/\' class=\'btn waves-effect waves-light red administrador-deletar-button ' + disabled_button + '\'>Deletar</button></td>' +
    '</tr>';

  AdministradoresLista.innerHTML += StringHTML;
}

function MostrarAluno(e) {
  let AlunoChave = e;
  let AlunoDados = Database.child("/alunos/" + AlunoChave);

  AlunoPagina.setAttribute("data-key", AlunoChave);

  ChangePage(AlunoPagina);

  AlunoDados.on("value", Snap => {
    let Aluno = Snap.val();

    let Nome = document.getElementById("aluno-nome");
    let Ano = document.getElementById("aluno-ano");
    let Colegio = document.getElementById("aluno-colegio");
    let Grupo = document.getElementById("aluno-grupo");
    let Nota = document.getElementById("aluno-nota");
    let Telefone = document.getElementById("aluno-telefone");
    let Foto = document.getElementById("aluno-foto-imagem");
    let Editor = document.querySelector("#aluno-editor .ql-editor");

    if (Snap.key !== "null") {

      Nome.value = Aluno.nome;
      Ano.value = Aluno.ano;
      Colegio.value = Aluno.colegio;
      Grupo.value = Aluno.grupo;
      Nota.value = Aluno.nota;
      // Telefone.value = Snap.key;
      $(Telefone).val(Snap.key).trigger('input');

      Foto.setAttribute("src", Aluno.foto);

      if (Aluno.foto == "" || Aluno.foto == null) {
        Foto.setAttribute("src", GalleryImage);
      }

      if (Snap.hasChild('criterios')) {
        aluno_editor.root.innerHTML = Aluno.criterios;
      } else {
        aluno_editor.root.innerHTML = "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";
      }
    }
  });
}

function DeletarAluno(e, path) {
  if (confirm('Atenção, você está prestes a deletar um aluno!')) {
    let Chave = e;
    let Path = path;
    let Dados = Database.child(Path + Chave);

    Dados.once("value", Snap => {
      Registrar("O(a) administrador(a) " + Vue.UserName + " (" + Vue.UserGroup + ") removeu o(a) aluno(a) " + Snap.val().nome + " (" + Snap.val().grupo + ") com a nota " + Snap.val().nota);
    });

    Dados.remove();
  }
}

function EditarAluno() {
  let AlunoChave = AlunoPagina.getAttribute("data-key");

  let Nome = document.getElementById("aluno-nome");
  let Ano = document.getElementById("aluno-ano");
  let Colegio = document.getElementById("aluno-colegio");
  let Grupo = document.getElementById("aluno-grupo");
  let Nota = document.getElementById("aluno-nota");
  let Telefone = "+" + document.getElementById("aluno-telefone").value.replace(/[^0-9]/g, '');
  let Foto = document.getElementById("aluno-foto-imagem");
  let Editor = document.querySelector("#aluno-editor .ql-editor");

  if (Foto.src != LoadingImage) {
    let AlunoDados;

    let Dados = {
      nome: NomeMask(Nome.value),
      ano: Ano.value,
      colegio: Colegio.value,
      grupo: Grupo.value,
      nota: Nota.value,
      foto: Foto.src,
      criterios: Editor.innerHTML
    };

    if (AlunoChave != null && AlunoChave != "null") {

      AlunoDados = Database.child("/alunos/" + Telefone);
      AlunoDados.update(Dados);

      Registrar("O(a) administrador(a) " + Vue.UserName + " (" + Vue.UserGroup + ") atualizou o(a) aluno(a) " + Nome.value + " (" + Grupo.value + ") com a nota " + Nota.value);

      if (AlunoChave != Telefone) {
        AlunoDados = Database.child("/alunos/" + AlunoChave);
        AlunoDados.remove();
      }
    } else {
      Database.child("alunos").child(Telefone).once("value", function (Snap) {
        if (Snap.exists()) {

          Notificacao("Já existe um(a) aluno(a) com esse telefone");

        } else {
          AlunoDados = Database.child("/alunos/" + Telefone);

          AlunoDados.set(Dados);

          Registrar("O(a) administrador(a) " + Vue.UserName + " (" + Vue.UserGroup + ") adicionou o(a) aluno(a) " + Nome.value + " (" + Grupo.value + ") com a nota " + Nota.value);
        }
      });
    }

    Foto.src = GalleryImage;

    ChangePage(Alunos);
  }
}

function TabelaAdministradores() {
  AdministradoresDados.on("child_added", Snap => {
    DestroyTable();

    ListarAdministrador(Snap);

    CreateTable();
  });

  AdministradoresDados.on("child_changed", Snap => {
    DestroyTable();

    RemoverLinha(Snap);
    ListarAdministrador(Snap);

    CreateTable();
  });

  AdministradoresDados.on("child_removed", Snap => {
    DestroyTable();

    RemoverLinha(Snap);

    CreateTable();
  });
}

function DeletarAdministrador(e, path) {
  if (confirm('Atenção, você está prestes a deletar um administrador!')) {
    let Chave = e;
    let Path = path;
    let Dados = Database.child(Path + Chave);

    Dados.once("value", Snap => {
      Registrar("O(a) administrador " + Vue.UserName + " (" + Vue.UserGroup + ") removeu o(a) administrador " + Snap.val().nome + " (" + Snap.val().grupo + ") com a nota " + Snap.val().nota + " e com o telefone " + Snap.key);
    });

    Dados.remove();
  }
}

function MostrarAdministrador(e) {
  let AlunoChave = e;
  let AlunoDados = Database.child("/administradores/" + AlunoChave);

  AdministradorPagina.setAttribute("data-key", AlunoChave);

  ChangePage(AdministradorPagina);

  AlunoDados.on("value", Snap => {
    let Aluno = Snap.val();

    let Nome = document.getElementById("administrador-nome");
    let Ano = document.getElementById("administrador-ano");
    let Colegio = document.getElementById("administrador-colegio");
    let Grupo = document.getElementById("administrador-grupo");
    let Nota = document.getElementById("administrador-nota");
    let Telefone = document.getElementById("administrador-telefone");
    let Foto = document.getElementById("administrador-foto-imagem");
    let Editor = document.querySelector("#administrador-editor .ql-editor");

    if (Snap.key !== "null") {

      Nome.value = Aluno.nome;
      Ano.value = Aluno.ano;
      Colegio.value = Aluno.colegio;
      Grupo.value = Aluno.grupo;
      Nota.value = Aluno.nota;

      $(Telefone).val(Snap.key).trigger('input');

      Foto.setAttribute("src", Aluno.foto);

      if (Aluno.foto == "" || Aluno.foto == null) {
        Foto.setAttribute("src", GalleryImage);
      }

      if (Grupo.value == "Desenvolvedor") {
        Grupo.childNodes[1].setAttribute("disabled", "");
        Grupo.childNodes[2].setAttribute("disabled", "");

        Grupo.childNodes[3].removeAttribute("disabled");
      } else {

        Grupo.childNodes[1].removeAttribute("disabled");
        Grupo.childNodes[2].removeAttribute("disabled");

        Grupo.childNodes[3].setAttribute("disabled", "");
      }

      if (Snap.hasChild('criterios')) {
        administrador_editor.root.innerHTML = Aluno.criterios;
      } else {
        administrador_editor.root.innerHTML = "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";
      }
    }
  });
}

function EditarAdministrador() {
  let AlunoChave = AdministradorPagina.getAttribute("data-key");

  let Nome = document.getElementById("administrador-nome");
  let Ano = document.getElementById("administrador-ano");
  let Colegio = document.getElementById("administrador-colegio");
  let Grupo = document.getElementById("administrador-grupo");
  let Nota = document.getElementById("administrador-nota");
  let Telefone = "+" + document.getElementById("administrador-telefone").value.replace(/[^0-9]/g, '');
  let Foto = document.getElementById("administrador-foto-imagem");
  let Editor = document.querySelector("#administrador-editor .ql-editor");

  if (Foto.src != LoadingImage) {
    let AlunoDados;

    let Dados = {
      nome: NomeMask(Nome.value),
      ano: Ano.value,
      colegio: Colegio.value,
      grupo: Grupo.value,
      nota: Nota.value,
      foto: Foto.src,
      criterios: Editor.innerHTML
    };

    if (AlunoChave != null && AlunoChave != "null") {

      AlunoDados = Database.child("/administradores/" + Telefone);
      AlunoDados.update(Dados);

      Registrar("O(a) administrador(a) " + Vue.UserName + " (" + Vue.UserGroup + ") atualizou o(a) administrador(a) " + Nome.value + " (" + Grupo.value + ") com a nota " + Nota.value + " e com o telefone " + Telefone);

      if (AlunoChave != Telefone) {
        AlunoDados = Database.child("/administradores/" + AlunoChave);
        AlunoDados.remove();
      }

    } else {
      Database.child("administradores").child(Telefone).once("value", function (Snap) {
        if (Snap.exists()) {
          Notificacao("Ja existe um(a) administrador(a) com esse telefone");
        } else {
          AlunoDados = Database.child("/administradores/" + Telefone);

          AlunoDados.set(Dados);

          Registrar("O(a) administrador(a) " + Vue.UserName + " (" + Vue.UserGroup + ") adicionou o(a) administrador(a) " + Nome.value + " (" + Grupo.value + ") com a nota " + Nota.value + " e com o telefone " + Telefone);
        }
      });
    }

    Foto.src = GalleryImage;

    ChangePage(AdministradoresPagina);
  }
}

function RemoverLinha(Snap) {
  document.querySelector("tr[data-key='" + Snap.key + "']").remove();
}

function MostrarEsconder(Mostrar, Esconder) {
  Mostrar.style.display = "block";
  Esconder.style.display = "none";
}
// Firebase - End

// TecWolf
var GET = (function (a) {
  if (a == "") {
    return {};
  }

  let b = {};

  for (let i = 0; i < a.length; ++i) {
    let c = a[i].split("=", 2);

    if (c.length == 1) {
      b[c[0]] = "";
    } else {
      b[c[0]] = decodeURIComponent(c[1].replace(/\+/g, " "));
    }
  }

  return b;
})(window.location.search.substr(1).split("&"));

function SetAdminPage() {
  Vue.AdminPage = GET["p"] == null ? "menu" : GET["p"];

  let AdminElement = document.getElementById(Vue.AdminPage);
  if (AdminElement) {
    document.getElementById(Vue.AdminPage).style.display = "block";
  } else {
    document.getElementById("menu").style.display = "block";
    Vue.AdminPage = "menu";
  }

  document.getElementById(Vue.AdminPage + '-url').className = 'active';

  checkPermission();

  Update();
}

function SetStudentPage() {
  if (GET["p"] == "alunos-adicionar" && GET["q"] != null) {}
}

// TecWolf - End

function ChangePage(To) {
  $("main").children().hide();
  $(To).show();

  CreateTable();
};

function Registrar(Registro) {
  if (Vue.HasWrite) {
    Database.child("/registros/").push().set({
      registro: Registro,
      timestamp: Date.now()
    });
  } else {
    Notificacao("Usuário não tem permissão de administrador(a)");
  }
}

function Notificacao(Mensagem) {
  M.toast({
    html: Mensagem
  });
}

function ChecarTimestamp(Snap) {
  let Time = new Date().getTime() - Snap.val().timestamp;

  if (Time <= 1000) {
    Notificacao(Snap.val().registro);
    NotificacaoDesktop(Snap.val().registro);
  }
}

// Login - Start
function LoginRecaptcha() {
  window.RecaptchaVerificador = new firebase.auth.RecaptchaVerifier("telefone-button", {
    "size": "invisible",
    "callback": function (Response) {
      LoginTelefone();
    }
  });

  RecaptchaVerificador.render().then(function (WidgetID) {
    window.RecaptchaWidgetID = WidgetID;
  });
}

function LoginTelefone() {
  let Telefone = document.getElementById("telefone-input").value;
  let RecaptchaVerificador = window.RecaptchaVerificador;

  firebase.auth().signInWithPhoneNumber(Telefone, RecaptchaVerificador)
    .then(function (Result) {
      window.RecaptchaResultado = Result;
      ChangePage("#senha");
      Notificacao("Uma nova senha foi enviada para o seu telefone");
      console.log(Result);
    }).catch(function (Error) {
      window.RecaptchaVerificador.render().then(function (WidgetId) {
        grecaptcha.reset(WidgetId);
      });
      Notificacao("Houve um erro ao enviar a senha para o seu telefone");
      console.error(Error);
    });
}

function LoginSenha() {
  let Senha = document.getElementById("senha-input").value;

  RecaptchaResultado.confirm(Senha).then(function (Result) {
    Notificacao("Conectado com sucesso");
    console.log(Result);
  }).catch(function (Error) {
    Notificacao("Erro ao conectar");
    console.error(Error);
  });
}

function LoginDeslogar() {
  firebase.auth().signOut().then(function (Result) {
    Notificacao("Deslogado com sucesso");
    console.log(Result);
  }).catch(function (Error) {
    Notificacao("Erro ao deslogar");
    console.error(Error);
  });
}

function LoginRedirecionar() {
  if (Vue.Page == "login") {
    if (!Vue.HasLogin) {
      LoginRecaptcha();
    } else {
      window.location.href = "/dashboard";
    }
  }
  if (Vue.Page == "dashboard") {
    if (Vue.HasLogin) {
      SetAdminPage();
      switch (Vue.AdminPage) {
        case "alunos":
          TabelaAlunos();
          break;
        case "registros":
          TabelaRegistros();
          break;
        case "administradores":
          TabelaAdministradores();
          break;
      }
    } else {
      window.location.href = "/login";
    }
  }
}

function LoginChecar() {
  firebase.auth().onAuthStateChanged(function (User) {
    if (User) {
      Vue.HasLogin = true;
      Database.child("administradores").child(User.phoneNumber).on("value", function (Snap) {
        if (Snap.exists()) {
          Vue.HasWrite = true;
          Vue.UserName = Snap.val().nome;
          Vue.UserNote = Snap.val().nota;
          Vue.UserGroup = Snap.val().grupo;

          Vue.UserText = Snap.hasChild('criterios') ? Snap.val().criterios : "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";

          $("#loading-dashboard").hide();
          $("#app").show();
        } else {
          Database.child("alunos").child(User.phoneNumber).on("value", function (SnapStudent) {
            if (SnapStudent.exists()) {
              Vue.HasWrite = false;
              Vue.UserName = SnapStudent.val().nome;
              Vue.UserNote = SnapStudent.val().nota;
              Vue.UserGroup = SnapStudent.val().grupo;

              Vue.UserText = SnapStudent.hasChild('criterios') ? SnapStudent.val().criterios : "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";

              $("#loading-dashboard").hide();
              $("#app").show();
            } else {
              Notificacao("Tentativa de acesso não autorizada foi detectada");
              LoginDeslogar();
            }
          });
        }
      });
      Vue.UserId = User.uid;
      Vue.UserNumber = User.phoneNumber;
    } else {
      Vue.HasLogin = false;
    }

    LoginRedirecionar();
  });
}
// Login - End

var checkPermission = () => {
  let URL = "https://acaofilosofica.com/api/checkuser?id=" + Vue.UserId + "&phone=" + Vue.UserNumber + "&page=" + Vue.AdminPage;

  let XHTTP = new XMLHttpRequest();
  XHTTP.open("GET", URL, true);
  XHTTP.onload = function (e) {
    if (XHTTP.readyState === 4) {
      if (XHTTP.status === 200) {
        console.log(XHTTP.responseText);
      } else {
        console.error(XHTTP.statusText);
      }
    }
  };
  XHTTP.onerror = function (e) {
    console.error(XHTTP.statusText);
  };
  XHTTP.send(null);
};

function MudarInput(Element, Condition, Value, Children) {
  for (i = 0; i < Children.length; i++) {
    if ($(Element).val() == Condition) {
      if (document.querySelector(Children[i]).type == "number") {
        document.querySelector(Children[i]).type = "text";
      }
      $(Children[i]).val(Value);
    } else {
      if (document.querySelector(Children[i]).type == "text") {
        document.querySelector(Children[i]).type = "number";
      }
      $(Children[i]).val($(Children[i]).attr("data-value"));
    }
  }
}

window.notify = {
  list: [],
  id: 0,

  compatible: function () {
    if (typeof Notification === 'undefined') {
      console.log("Notifications are not available for your browser.");
      return false;
    }
    return true;
  },

  authorize: function () {
    if (notify.compatible()) {
      Notification.requestPermission(function (permission) {
        console.log("Permission to display: " + permission);
      });
    }
  },

  showDelayed: function (seconds) {
    console.log("A notification will be triggered in " + seconds + " seconds. Try minimising the browser now.");
    setTimeout(notify.show, (seconds * 1000));
  },

  show: function (Body) {

    if (typeof Notification === 'undefined') {
      notify.log("Notifications are not available for your browser.");
      return;
    }
    if (notify.compatible()) {

      notify.id++;

      let id = notify.id;

      notify.list[id] = new Notification("DEAF - Ação Filosófica", {
        body: Body,
        tag: id,
        icon: "/assets/image/icon.png",
        lang: "",
        dir: "auto",
      });

      console.log("Notification #" + id + " queued for display");

      notify.list[id].onclick = function () {
        notify.logEvent(id, "clicked");
      };

      notify.list[id].onshow = function () {
        notify.logEvent(id, "showed");
      };

      notify.list[id].onerror = function () {
        notify.logEvent(id, "errored");
      };

      notify.list[id].onclose = function () {
        notify.logEvent(id, "closed");
      };

      console.log("Created a new notification ...");
      console.log(notify.list[id]);
    }
  },
  logEvent: function (id, event) {
    console.log("Notification #" + id + " " + event);
  }
};

function NotificacaoDesktop(Body) {
  notify.authorize();
  notify.show(Body);
}

function NomeMask(Text) {
  if (Text != null && Text != "") {
    let Texto = Text.toLowerCase().trim();

    let Palavras = Texto.split(" ");

    for (let i = 0; i < Palavras.length; i++) {
      let Palavra = Palavras[i];

      let PrimeiraLetra = Palavra[0];

      if (Palavra.length > 2) {
        Palavra = PrimeiraLetra.toUpperCase() + Palavra.slice(1);
      } else {
        Palavra = PrimeiraLetra + Palavra.slice(1);
      }

      Palavras[i] = Palavra;
    }

    return Palavras.join(" ");
  }
}

$("img.lazy").Lazy();

function LazyIframe() {
  let iframe = document.getElementsByTagName('iframe');
  for (let i = 0; i < iframe.length; i++) {
    if (iframe[i].getAttribute('data-src')) {
      iframe[i].setAttribute('src', iframe[i].getAttribute('data-src'));
    }
  }
}

function DestroyTable() {
  $('table').DataTable().destroy();
}

function CreateTable() {
  $('table').DataTable({
      language: {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "",
        "oPaginate": {
          "sNext": "Próximo",
          "sPrevious": "Anterior",
          "sFirst": "Primeiro",
          "sLast": "Último"
        },
        "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
        }
      },
      searching: true,
      ordering: true,
      info: false,
      lengthChange: false,

      autoWidth: true,
      responsive: true
    })
    .columns.adjust()
    .responsive.recalc();

  $.fn.dataTable.ext.errMode = 'none';
}

function ListarPostagem(Snap) {

}

function MostrarPostagem(e) {

}

function EditarPostagem() {

}

function ResizeTable() {
  $('table').DataTable().columns.adjust()
    .responsive.recalc();
  $.fn.dataTable.ext.errMode = 'none';
}

function Update() {
  $('.dataTables_filter').removeClass('dataTables_filter').css('padding', '5px').append('<i class=\'material-icons\' style=\'bottom: 4vh; position: relative; float: right;\'>search</i>');
  $('.paginate_button').addClass('btn').removeClass('paginate_button').css('margin', '5px');

  requestAnimationFrame(Update);
}

requestAnimationFrame(Update);

function CheckURL(item, index) {
  if (GET['p'] !== undefined) {
    if (item.href === window.location.href || item.href + "#" === window.location.href) {
      item.href = '#';
    }
  } else if (index === 0) {
    item.href = '#';
  }
}

window.onresize = () => {
  ResizeTable();
}

window.onload = function () {
  if (Vue.Page != "dashboard") {
    $("#loading").hide();
    $("#app").show();
  }

  LazyIframe();
  CreateTable();

  [...document.getElementsByClassName("url")].forEach(CheckURL);

  $('#' + Vue.AdminPage + '-url a').on('click', function () {
    ChangePage('#' + Vue.AdminPage)
  });

  $('#administradores-lista').on('click', '.administrador-mostrar-button', function () {
    MostrarAdministrador($(this).attr('data-key'));
  });
  $('#administradores-lista').on('click', '.administrador-deletar-button', function () {
    DeletarAdministrador($(this).attr('data-key'), $(this).attr('data-path'));
  });
  $('#alunos-lista').on('click', '.aluno-mostrar-button', function () {
    MostrarAluno($(this).attr('data-key'));
  });
  $('#alunos-lista').on('click', '.aluno-deletar-button', function () {
    DeletarAluno($(this).attr('data-key'), $(this).attr('data-path'));
  });

  $(".phone-input").mask("+55 (00) N ZZZZ-ZZZZ", {
    translation: {
      'N': {
        pattern: /9/,
        fallback: 9
      },
      'Z': {
        pattern: /[0-9]/
      }
    },
    keepStatic: true
  });
};