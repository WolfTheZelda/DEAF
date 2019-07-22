// Vue - Start
var Vue = new Vue({
  el: "#app",
  data: {
    Page: location.pathname.split("/").slice(-1)[0].replace(".html", ""),

    HasLogin: false,
    HasWrite: false,
    UserId: "",
    UserName: "Usuário",
    UserNumber: "Telefone",
    UserNote: "∞",
    VideoRandom: "https://www.youtube.com/embed?listType=playlist&list=PLwxNMb28XmpeypJMHfNbJ4RAFkRtmAN3P&fs=0&rel=0&showinfo=0&showsearch=0&controls=0&modestbranding=0&autohide=1&autoplay=1&loop=1&disablekb=1&cc_load_policy=1&iv_load_policy=3&cc_lang_pref=pt&index=" + Math.floor((Math.random() * 34))
  }
});
// Vue - End

// Materialize - Start
M.AutoInit();
// Materialize - End

// Firebase - Start
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

const GalleryImage = "/assets/image/gallery.gif",
  LoadingImage = "/assets/image/loading.gif";

function EnviarArquivo(Input, Img, Path) {
  Img = document.getElementById(Img);

  var OldLink = Img.src;
  OldLink = OldLink.substring(OldLink.indexOf("/assets"), OldLink.lastIndexOf(""));

  Img.src = LoadingImage;

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

      if (OldLink != GalleryImage && OldLink != LoadingImage) {
        var DeletePath = firebase.storage().refFromURL(OldLink);

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

  if (Foto.src != LoadingImage) {
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

  if (Foto.src != LoadingImage) {
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
      SetEditor();
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
        } else {
          Database.child("alunos").child(User.phoneNumber).on("value", function (SnapStudent) {
            if (SnapStudent.exists()) {
              Vue.HasWrite = false;
              Vue.UserName = SnapStudent.val().nome;
              Vue.UserNote = SnapStudent.val().nota;
            } else {
              Notificacao("Tentativa de acesso não autorizada foi detectada");
              LoginDeslogar();
            }
          });
        }
      });
      Vue.UserId = User.uid;
      Vue.UserNumber = User.phoneNumber;

      var URL = "https://acaofilosofica.web.app/api/checkuser?id=" + Vue.UserId + "&phone=" + Vue.UserNumber;

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

$("img.lazy").Lazy();

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

function SetEditor() {
  var editor = new Quill('#editor', {
    theme: 'snow'
  });

  editor.on('text-change', function () {
    editor.root.innerHTML;
  });
}

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

  if (Foto.src != LoadingImage) {
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