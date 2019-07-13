// Vue - Start
var Vue = new Vue({
  el: "#app",
  data: {
    Page: location.pathname.split("/").slice(-1)[0].replace(".html", ""),

    HasLogin: false,
    HasWrite: false,
    UserId: "",
    UserName: "",
    UserNumber: "",
    VideoRandom: "https://www.youtube.com/embed?listType=playlist&list=PLwxNMb28XmpeypJMHfNbJ4RAFkRtmAN3P&fs=0&rel=0&showinfo=0&showsearch=0&controls=0&modestbranding=0&autohide=1&autoplay=1&loop=1&disablekb=1&cc_load_policy=1&iv_load_policy=3&cc_lang_pref=pt&index=" + Math.floor((Math.random() * 34))
  }
});
// Vue - End

// Materialize - Start
M.AutoInit();
// Materialize - End

// Firebase - Start
const Config = {
  apiKey: "AIzaSyDBL2ucLKsMKjX9JKpKYYWItbMiMlNHc8U",
  authDomain: "debartefilosofico.firebaseapp.com",
  databaseURL: "https://debartefilosofico.firebaseio.com",
  projectId: "debartefilosofico",
  storageBucket: "debartefilosofico.appspot.com",
  messagingSenderId: "141885700923",
  appId: "1:141885700923:web:0557433267ad361f"
};

firebase.initializeApp(Config);

LoginChecar();

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

const RegistrosDados = Database.child("registros");
const RegistrosLista = document.getElementById("registros-lista");

const PostagensDados = Database.child("postagens");
const PostagensLista = document.getElementById("postagens-lista");

const GalleryImage = "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Fgallery.gif?alt=media&token=4ef3908a-d68c-4702-8cc0-8b1add9170a9",
  LoadingImage = "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Floading.gif?alt=media&token=d420aa17-dba9-4487-86bd-ad4a9a73b37e";

function EnviarArquivo(Input, Img, Path) {
  Img = document.getElementById(Img);

  var OldLink = Img.src;

  Img.src = "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Floading.gif?alt=media&token=d420aa17-dba9-4487-86bd-ad4a9a73b37e";

  var Arquivo = document.getElementById(Input).files[0];
  var Nome = Database.child(Path).push().key;

  var MetaData = {
    contentType: Arquivo.type
  };

  var Task = Storage.child(Path + Nome).put(Arquivo, MetaData);

  Task
    .then(Snap => Snap.ref.getDownloadURL())
    .then((URL) => {
      Img.src = URL;

      var DeletePath = firebase.storage().refFromURL(OldLink);

      if (OldLink != GalleryImage && OldLink != LoadingImage) {
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
  RegistrosDados.on("child_added", Snap => {
    DestroyTable();
    ListarRegistro(Snap);
    CreateTable();
  });
  RegistrosDados.on("child_changed", Snap => {
    DestroyTable();
    RemoverLinha(Snap);
    ListarRegistro(Snap);
    CreateTable();

    // Notificacao(Snap.val().registro);
  });
  RegistrosDados.on("child_removed", Snap => {
    DestroyTable();
    RemoverLinha(Snap);
    CreateTable();
  });

  RegistrosDados.endAt().limitToLast(1).on("child_added", Snap => {
    ChecarTimestamp(Snap);
  });
  /*
  RegistrosDados.endAt().limitToLast(1).on("child_changed", Snap => {
    ChecarTimestamp(Snap);
  });
  RegistrosDados.endAt().limitToLast(1).on("child_removed", Snap => {
    ChecarTimestamp(Snap);
  });
  */
}

function ListarRegistro(Snap) {
  let Aluno = Snap.val();

  let Linha = document.createElement("tr");

  let Nome = document.createElement("td");
  let Ano = document.createElement("td");

  Nome.innerHTML = Aluno.registro;
  Ano.innerHTML = new Date(Aluno.timestamp).toLocaleString();

  Linha.append(Nome);
  Linha.append(Ano);

  Linha.setAttribute("data-key", Snap.key);

  RegistrosLista.append(Linha);
}












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

function ListarAluno(Snap) {
  let Aluno = Snap.val();

  let Linha = document.createElement("tr");

  let Nome = document.createElement("td");
  let Ano = document.createElement("td");
  let Colegio = document.createElement("td");
  let Grupo = document.createElement("td");
  let Nota = document.createElement("td");
  let Telefone = document.createElement("td");
  let TelefoneBotao = document.createElement("a");

  let Mostrar = document.createElement("td");
  let MostrarBotao = document.createElement("button");

  let Deletar = document.createElement("td");
  let DeletarBotao = document.createElement("button");

  Nome.innerHTML = Aluno.nome;
  Ano.innerHTML = Aluno.ano;
  Colegio.innerHTML = Aluno.colegio;
  Grupo.innerHTML = Aluno.grupo;
  Nota.innerHTML = Aluno.nota;

  Linha.append(Nome);
  Linha.append(Ano);
  Linha.append(Colegio);
  Linha.append(Grupo);
  Linha.append(Nota);

  TelefoneBotao.innerHTML = Snap.key;
  TelefoneBotao.className = "btn waves-effect waves-light green";
  TelefoneBotao.setAttribute("target", "_blank");
  TelefoneBotao.setAttribute("href", "https://wa.me/" + Snap.key.replace("+", ""));
  Telefone.append(TelefoneBotao);
  Linha.append(Telefone);

  MostrarBotao.className = "btn waves-effect waves-light blue aluno-mostrar-button";
  MostrarBotao.innerHTML = "Mostrar";
  MostrarBotao.addEventListener("click", MostrarAluno);
  Mostrar.append(MostrarBotao);
  Linha.append(Mostrar);

  DeletarBotao.className = "btn waves-effect waves-light red aluno-deletar-button";
  DeletarBotao.innerHTML = "Deletar";
  DeletarBotao.addEventListener("click", DeletarAluno);

  DeletarBotao.setAttribute("data-path", "/alunos/");

  Deletar.append(DeletarBotao);
  Linha.append(Deletar);

  Linha.setAttribute("data-key", Snap.key);

  AlunosLista.append(Linha);
}

function MostrarAluno(e) {
  var AlunoChave = e.target.closest("tr").getAttribute("data-key");
  var AlunoDados = Database.child("/alunos/" + AlunoChave);

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
  });
}

function DeletarAluno(e) {
  var Chave = e.target.closest("tr").getAttribute("data-key");
  var Path = e.target.getAttribute("data-path");
  var Dados = Database.child(Path + Chave);

  Dados.once("value", Snap => {
    Registrar("O administrador " + Vue.UserName + " removeu o aluno " + Snap.val().nome + " com a nota " + Snap.val().nota);
  });

  Dados.remove();
}

function EditarAluno() {
  var AlunoChave = AlunoPagina.getAttribute("data-key");

  let Nome = document.getElementById("aluno-nome");
  let Ano = document.getElementById("aluno-ano");
  let Colegio = document.getElementById("aluno-colegio");
  let Grupo = document.getElementById("aluno-grupo");
  let Nota = document.getElementById("aluno-nota");
  let Telefone = "+" + document.getElementById("aluno-telefone").value.replace(/[^0-9]/g, '');
  let Foto = document.getElementById("aluno-foto-imagem");

  if (Foto.src != "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Floading.gif?alt=media&token=d420aa17-dba9-4487-86bd-ad4a9a73b37e") {
    var AlunoDados;

    var Dados = {
      nome: NomeMask(Nome.value),
      ano: Ano.value,
      colegio: Colegio.value,
      grupo: Grupo.value,
      nota: Nota.value,
      foto: Foto.src
    };

    if (AlunoChave != null && AlunoChave != "null") {

      AlunoDados = Database.child("/alunos/" + Telefone);
      AlunoDados.update(Dados);

      Registrar("O administrador " + Vue.UserName + " atualizou o aluno " + Nome.value + " com a nota " + Nota.value);

      if (AlunoChave != Telefone) {
        AlunoDados = Database.child("/alunos/" + AlunoChave);
        AlunoDados.remove();
      }
    } else {
      Database.child("alunos").child(Telefone).once("value", function (Snap) {
        if (Snap.exists()) {

          Notificacao("Já existe um aluno com esse telefone");

        } else {
          AlunoDados = Database.child("/alunos/" + Telefone);

          AlunoDados.set(Dados);

          Registrar("O administrador " + Vue.UserName + " adicionou o aluno " + Nome.value + " com a nota " + Nota.value);
        }
      });
    }

    Foto.src = GalleryImage;

    ChangePage(Alunos);
  }
}
$("#aluno-telefone").mask("+55 (00) 0 0000-0000");










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

function DeletarAdministrador(e) {
  var Chave = e.target.closest("tr").getAttribute("data-key");
  var Path = e.target.getAttribute("data-path");
  var Dados = Database.child(Path + Chave);

  Dados.once("value", Snap => {
    Registrar("O administrador " + Vue.UserName + " removeu o administrador " + Snap.val().nome + " com o telefone " + Snap.key);
  });

  Dados.remove();
}

function ListarAdministrador(Snap) {
  let Aluno = Snap.val();

  let Linha = document.createElement("tr");

  let Nome = document.createElement("td");
  let Ano = document.createElement("td");
  let Colegio = document.createElement("td");
  let Grupo = document.createElement("td");
  let Nota = document.createElement("td");
  let Telefone = document.createElement("td");
  let TelefoneBotao = document.createElement("a");

  let Mostrar = document.createElement("td");
  let MostrarBotao = document.createElement("button");

  let Deletar = document.createElement("td");
  let DeletarBotao = document.createElement("button");

  Nome.innerHTML = Aluno.nome;
  Ano.innerHTML = Aluno.ano;
  Colegio.innerHTML = Aluno.colegio;
  Grupo.innerHTML = Aluno.grupo;
  Nota.innerHTML = Aluno.nota;

  Linha.append(Nome);
  Linha.append(Ano);
  Linha.append(Colegio);
  Linha.append(Grupo);
  Linha.append(Nota);

  TelefoneBotao.innerHTML = Snap.key;
  TelefoneBotao.className = "btn waves-effect waves-light green";
  TelefoneBotao.setAttribute("target", "_blank");
  TelefoneBotao.setAttribute("href", "https://wa.me/" + Snap.key.replace("+", ""));
  Telefone.append(TelefoneBotao);
  Linha.append(Telefone);

  MostrarBotao.className = "btn waves-effect waves-light blue administrador-mostrar-button";
  MostrarBotao.innerHTML = "Mostrar";
  MostrarBotao.addEventListener("click", MostrarAdministrador);
  Mostrar.append(MostrarBotao);
  Linha.append(Mostrar);

  DeletarBotao.innerHTML = "Deletar";

  if (Aluno.grupo != "Desenvolvedor") {
    DeletarBotao.className = "btn waves-effect waves-light red administrador-deletar-button";

    DeletarBotao.addEventListener("click", DeletarAdministrador);
  } else {
    DeletarBotao.className = "btn waves-effect waves-light red administrador-deletar-button disabled";
  }

  DeletarBotao.setAttribute("data-path", "/administradores/");

  Deletar.append(DeletarBotao);
  Linha.append(Deletar);

  Linha.setAttribute("data-key", Snap.key);

  AdministradoresLista.append(Linha);
}

function MostrarAdministrador(e) {
  var AlunoChave = e.target.closest("tr").getAttribute("data-key");
  var AlunoDados = Database.child("/administradores/" + AlunoChave);

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

    if (Grupo.value == "Desenvolvedor") {
      Grupo.childNodes[1].setAttribute("disabled", "");
      Grupo.childNodes[2].setAttribute("disabled", "");

      Grupo.childNodes[3].removeAttribute("disabled");
    } else {

      Grupo.childNodes[1].removeAttribute("disabled");
      Grupo.childNodes[2].removeAttribute("disabled");

      Grupo.childNodes[3].setAttribute("disabled", "");
    }
  });
}

function EditarAdministrador() {
  var AlunoChave = AdministradorPagina.getAttribute("data-key");

  let Nome = document.getElementById("administrador-nome");
  let Ano = document.getElementById("administrador-ano");
  let Colegio = document.getElementById("administrador-colegio");
  let Grupo = document.getElementById("administrador-grupo");
  let Nota = document.getElementById("administrador-nota");
  let Telefone = "+" + document.getElementById("administrador-telefone").value.replace(/[^0-9]/g, '');
  let Foto = document.getElementById("administrador-foto-imagem");

  if (Foto.src != "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Floading.gif?alt=media&token=d420aa17-dba9-4487-86bd-ad4a9a73b37e") {
    var AlunoDados;

    var Dados = {
      nome: NomeMask(Nome.value),
      ano: Ano.value,
      colegio: Colegio.value,
      grupo: Grupo.value,
      nota: Nota.value,
      foto: Foto.src
    };

    if (AlunoChave != null && AlunoChave != "null") {

      AlunoDados = Database.child("/administradores/" + Telefone);
      AlunoDados.update(Dados);

      Registrar("O administrador " + Vue.UserName + " atualizou o administrador " + Nome.value + " com o telefone " + Telefone);

      if (AlunoChave != Telefone) {
        AlunoDados = Database.child("/administradores/" + AlunoChave);
        AlunoDados.remove();
      }

    } else {
      Database.child("administradores").child(Telefone).once("value", function (Snap) {
        if (Snap.exists()) {
          Notificacao("Ja existe um Administrador com esse Telefone");
        } else {
          AlunoDados = Database.child("/administradores/" + Telefone);

          AlunoDados.set(Dados);

          Registrar("O administrador " + Vue.UserName + " adicionou o administrador " + Nome.value + " com o telefone " + Telefone);
        }
      });
    }

    Foto.src = GalleryImage;

    ChangePage(AdministradoresPagina);
  }
}
$("#administrador-telefone").mask("+55 (00) 0 0000-0000");









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

  var b = {};

  for (var i = 0; i < a.length; ++i) {
    var c = a[i].split("=", 2);

    if (c.length == 1) {
      b[c[0]] = "";
    } else {
      b[c[0]] = decodeURIComponent(c[1].replace(/\+/g, " "));
    }
  }

  return b;
})(window.location.search.substr(1).split("&"));

function SetAdminPage() {
  // Vue.AdminPage = GET["p"] == null ? "menu" : GET["p"];

  var AdminElement = document.getElementById(Vue.AdminPage);

  if (AdminElement) {
    document.getElementById(Vue.AdminPage).style.display = "block";
  } else {
    document.getElementById("menu").style.display = "block";
    Vue.AdminPage = "menu";
  }
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

function Pesquisa() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("dashboard-pesquisa").getElementsByTagName("input")[0];
  filter = input.value.toUpperCase();
  table = document.getElementsByTagName("table");

  for (var i = 0; i < table.length; i++) {
    if (table[i].closest("section").style.display != "none" && table[i].closest("section").style.visibility != "hidden") {
      table = table[i];
    }
  }

  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];

    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function Registrar(Registro) {
  if (Vue.HasWrite) {
    Database.child("/registros/").push().set({
      registro: Registro,
      timestamp: Date.now()
    });
  } else {
    Notificacao("Usuário não tem permissão de administrador");
  }
}

function Notificacao(Mensagem) {
  M.toast({
    html: Mensagem
  });
}

function ChecarTimestamp(Snap) {
  var Time = new Date().getTime() - Snap.val().timestamp;

  if (Time <= 1000) {
    Notificacao(Snap.val().registro);
    NotificacaoDesktop(Snap.val().registro);
    NotificacaoCordova(Snap.val().registro);
  }
}

// Login - Start
$("#telefone-input").mask("+55 (00) 0 0000-0000");

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
  var Telefone = document.getElementById("telefone-input").value;
  var RecaptchaVerificador = window.RecaptchaVerificador;

  firebase.auth().signInWithPhoneNumber(Telefone, RecaptchaVerificador)
    .then(function (Result) {
      window.RecaptchaResultado = Result;
      ChangePage("#senha");
      Notificacao("Uma nova senha foi enviada para o telefone");
      console.log(Result);
    }).catch(function (Error) {
      window.RecaptchaVerificador.render().then(function (WidgetId) {
        grecaptcha.reset(WidgetId);
      });
      Notificacao("Houve um erro ao enviar a senha para o telefone");
      console.error(Error);
    });
}

function LoginSenha() {
  var Senha = document.getElementById("senha-input").value;

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
      TabelaAlunos();
      TabelaRegistros();
      TabelaAdministradores();
      SetAdminPage();
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
        } else {
          Database.child("alunos").child(User.phoneNumber).on("value", function (SnapStudent) {
            if (SnapStudent.exists()) {
              Vue.HasWrite = false;
              Vue.UserName = SnapStudent.val().nome;
            } else {
              Notificacao("Tentativa de acesso não autorizada foi detectada");
              LoginDeslogar();
            }
          });
        }
      });
      Vue.UserId = User.uid;
      Vue.UserNumber = User.phoneNumber;

      var URL = "https://debartefilosofico.web.app/DeleteUser?id=" + Vue.UserId + "&phone=" + Vue.UserNumber;

      var XHTTP = new XMLHttpRequest();
      XHTTP.open("GET", URL, false);
      XHTTP.send();

      console.log(XHTTP.responseText);
    } else {
      Vue.HasLogin = false;
    }

    LoginRedirecionar();
  });
}
// Login - End

function AudioHover(Value, Play) {
  if (Play) {
    $("audio")[Value].play();
  } else {
    $("audio")[Value].pause();
  }
}

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
      $(Children[i]).val("");
    }
  }
}

window.onload = function () {
  $("#app").show();
  LoadIframe();

  CreateTable();
};

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

      var id = notify.id;

      notify.list[id] = new Notification("DEAF", {
        body: Body,
        tag: id,
        icon: "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Ficon.png?alt=media&token=af014c48-c225-4c85-bf09-430ce2fde965",
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
    var Texto = Text.toLowerCase().trim();

    var Palavras = Texto.split(" ");

    for (var i = 0; i < Palavras.length; i++) {
      var Palavra = Palavras[i];

      var PrimeiraLetra = Palavra[0];

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

function Cordova() {
  if (window.hasOwnProperty("cordova")) {
    document.addEventListener("deviceready", onDeviceReady, false);

    eval("require('https://raw.githubusercontent.com/katzer/cordova-plugin-background-mode/master/www/background-mode.js')");
    eval("require('https://raw.githubusercontent.com/katzer/cordova-plugin-local-notifications/master/www/local-notification.js')");

    cordova.plugins.backgroundMode.enable();
    cordova.plugins.backgroundMode.setDefaults({
      silent: true
    });
  }
}

function NotificacaoCordova(Body) {
  if (window.hasOwnProperty("cordova")) {
    cordova.plugins.notification.local.schedule({
      title: 'DEAF',
      text: Body,
      foreground: true
    });
  }
}

Cordova();

function yall(options) {
  options = options || {};

  // Options
  const lazyClass = options.lazyClass || "lazy";
  const lazyBackgroundClass = options.lazyBackgroundClass || "lazy-bg";
  const idleLoadTimeout = "idleLoadTimeout" in options ? options.idleLoadTimeout : 200;
  const observeChanges = options.observeChanges || false;
  const events = options.events || {};

  // Shorthands (saves more than a few bytes!)
  const win = window;
  const ric = "requestIdleCallback";
  const io = "IntersectionObserver";

  // App stuff
  const dataAttrs = ["srcset", "src", "poster"];
  const arr = [];
  const queryDOM = (selector, root) => arr.slice.call((root || document).querySelectorAll(selector || `img.${lazyClass},video.${lazyClass},iframe.${lazyClass},.${lazyBackgroundClass}`));

  // This function handles lazy loading of elements.
  const yallLoad = element => {
    const parentNode = element.parentNode;
    let elements = [];
    let sourceNode;

    if (parentNode.nodeName == "PICTURE") {
      sourceNode = parentNode;
    }

    if (element.nodeName == "VIDEO") {
      sourceNode = element;
    }

    elements = queryDOM("source", sourceNode);

    for (let elementIndex in elements) {
      yallFlipDataAttrs(elements[elementIndex]);
    }

    yallFlipDataAttrs(element);

    if (element.autoplay) {
      element.load();
    }

    const classList = element.classList;

    // Lazy load CSS background images
    if (classList.contains(lazyBackgroundClass)) {
      classList.remove(lazyBackgroundClass);
      classList.add(options.lazyBackgroundLoaded || "lazy-bg-loaded");
    }
  };

  const yallBind = element => {
    for (let eventIndex in events) {
      element.addEventListener(eventIndex, events[eventIndex].listener || events[eventIndex], events[eventIndex].options || undefined);
    }

    intersectionListener.observe(element);
  };

  // Added because there was a number of patterns like this peppered throughout
  // the code. This just flips necessary data- attrs on an element
  const yallFlipDataAttrs = element => {
    dataAttrs.forEach(dataAttr => {
      if (dataAttr in element.dataset) {
        win["requestAnimationFrame"](() => {
          element[dataAttr] = element.dataset[dataAttr];
        });
      }
    });
  };

  let lazyElements = queryDOM();

  // If the current user agent is a known crawler, immediately load all media
  // for the elements yall is listening for and halt execution (good for SEO).
  if (/baidu|(?:google|bing|yandex|duckduck)bot/i.test(navigator.userAgent)) {
    for (let lazyElementIndex in lazyElements) {
      yallLoad(lazyElements[lazyElementIndex]);
    }

    return;
  }

  if (io in win && `${io}Entry` in win) {
    var intersectionListener = new win[io]((entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio) {
          const element = entry.target;

          if (ric in win && idleLoadTimeout) {
            win[ric](() => {
              yallLoad(element);
            }, {
              timeout: idleLoadTimeout
            });
          } else {
            yallLoad(element);
          }

          element.classList.remove(lazyClass);
          observer.unobserve(element);
          lazyElements = lazyElements.filter(lazyElement => lazyElement != element);

          if (!lazyElements.length && !observeChanges) {
            intersectionListener.disconnect();
          }
        }
      });
    }, {
      rootMargin: `${"threshold" in options ? options.threshold : 200}px 0%`
    });

    for (let lazyElementIndex in lazyElements) {
      yallBind(lazyElements[lazyElementIndex]);
    }

    if (observeChanges) {
      new MutationObserver(() => {
        queryDOM().forEach(newElement => {
          if (lazyElements.indexOf(newElement) < 0) {
            lazyElements.push(newElement);
            yallBind(newElement);
          }
        });
      }).observe(queryDOM(options.observeRootSelector || "body")[0], options.mutationObserverOptions || {
        childList: true,
        subtree: true
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", yall);

function LoadIframe() {
  var vidDefer = document.getElementsByTagName('iframe');
  for (var i = 0; i < vidDefer.length; i++) {
    if (vidDefer[i].getAttribute('data-src')) {
      vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
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

      responsive: true
    })
    .columns.adjust()
    .responsive.recalc();

  $.fn.dataTable.ext.errMode = 'none';

  $('.dataTables_filter').removeClass('dataTables_filter');
  $('.paginate_button').addClass('btn').removeClass('paginate_button').css('margin', '5px');

  // SetTableEvents();
}

function SetTableEvents() {
  $("#administradores-lista").bind("click", ".administrador-mostrar-button", MostrarAdministrador);

  $("#administradores-lista").bind("click", ".administrador-deletar-button", DeletarAdministrador);

  $("#alunos-lista").bind("click", ".aluno-mostrar-button", MostrarAluno);

  $("#alunos-lista").bind("click", ".aluno-mostrar-button", DeletarAdministrador);
}

var editor = new Quill('#editor', {
  theme: 'snow'
});

editor.on('text-change', function () {
  var ConteudoJSON = JSON.stringify(editor.getContents());



  editor.innerHTML = ConteudoJSON;
});

function ListarPostagem(Snap) {
  let Dados = Snap.val();

  let Linha = document.createElement("tr");

  let Texto = document.createElement("td");
  let Data = document.createElement("td");

  let Mostrar = document.createElement("td");
  let MostrarBotao = document.createElement("button");
  let Deletar = document.createElement("td");
  let DeletarBotao = document.createElement("button");

  Texto.innerHTML = Dados.texto;
  Data.innerHTML = new Date(Dados.timestamp).toLocaleString();

  Mostrar.append(MostrarBotao);
  Deletar.append(DeletarBotao);

  Linha.append(Texto);
  Linha.append(Data);
  Linha.append(Mostrar);
  Linha.append(Deletar);

  Linha.setAttribute("data-key", Snap.key);

  PostagensLista.append(Linha);
}

function MostrarPostagem(e) {
  var AlunoChave = e.target.closest("tr").getAttribute("data-key");
  var AlunoDados = Database.child("/postagens/" + AlunoChave);

  PostagemPagina.setAttribute("data-key", AlunoChave);

  ChangePage(PostagemPagina);

  PostagensDados.on("value", Snap => {
    let Aluno = Snap.val();

    let Nome = document.getElementById("postagem-titulo");
    let Editor = document.getElementById("postagem-editor");
    let Foto = document.getElementById("postagem-foto-imagem");

    Nome.value = Aluno.titulo;

    Foto.setAttribute("src", Aluno.foto);

    if (Aluno.foto == "" || Aluno.foto == null) {
      Foto.setAttribute("src", GalleryImage);
    }
  });
}

function EditarPostagem() {
  var AlunoChave = AdministradorPagina.getAttribute("data-key");

  let Nome = document.getElementById("administrador-nome");
  let Ano = document.getElementById("administrador-ano");
  let Colegio = document.getElementById("administrador-colegio");
  let Grupo = document.getElementById("administrador-grupo");
  let Nota = document.getElementById("administrador-nota");
  let Telefone = "+" + document.getElementById("administrador-telefone").value.replace(/[^0-9]/g, '');
  let Foto = document.getElementById("administrador-foto-imagem");

  if (Foto.src != "https://firebasestorage.googleapis.com/v0/b/debartefilosofico.appspot.com/o/assets%2Fimage%2Floading.gif?alt=media&token=d420aa17-dba9-4487-86bd-ad4a9a73b37e") {
    var AlunoDados;

    var Dados = {
      nome: NomeMask(Nome.value),
      ano: Ano.value,
      colegio: Colegio.value,
      grupo: Grupo.value,
      nota: Nota.value,
      foto: Foto.src
    };

    if (AlunoChave != null && AlunoChave != "null") {

      AlunoDados = Database.child("/administradores/" + Telefone);
      AlunoDados.update(Dados);

      Registrar("O administrador " + Vue.UserName + " atualizou o administrador " + Nome.value + " com o telefone " + Telefone);

      if (AlunoChave != Telefone) {
        AlunoDados = Database.child("/administradores/" + AlunoChave);
        AlunoDados.remove();
      }

    } else {
      Database.child("administradores").child(Telefone).once("value", function (Snap) {
        if (Snap.exists()) {
          Notificacao("Ja existe um Administrador com esse Telefone");
        } else {
          AlunoDados = Database.child("/administradores/" + Telefone);

          AlunoDados.set(Dados);

          Registrar("O administrador " + Vue.UserName + " adicionou o administrador " + Nome.value + " com o telefone " + Telefone);
        }
      });
    }

    Foto.src = GalleryImage;

    ChangePage(AdministradoresPagina);
  }
}

var Update = setInterval(function () {
  CreateTable();
}, 1000);