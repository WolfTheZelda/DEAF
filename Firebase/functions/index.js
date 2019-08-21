// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.HelloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.CheckUser = functions.https.onRequest((request, response) => {
    const user = request.query.id;
    const phone = "+" + request.query.phone.trim();
    
    let page = request.query.page;

    switch (page) {
        case "alunos":
            page = "Alunos"
            break;
        case "registros":
            page = "Registros"
            break;
        case "postagens":
            page = "Postagens"
            break;
        case "administradores":
            page = "Administradores"
            break;
        case "manutencao":
            page = "Manutenção"
            break;
        default:
            page = "Menu";
    }

    if (user !== null && phone !== null && page !== null) {
        admin.database().ref().child("administradores").child(phone).once("value", snap_admin => {

            if (!snap_admin.exists()) {

                admin.database().ref().child("alunos").child(phone).once("value", snap_student => {

                    if (!snap_student.exists()) {

                        admin.auth().deleteUser(user)
                            .then(() =>
                                response.send("Usuário sem permissão foi deletado com sucesso")
                            )
                            .catch(() =>
                                response.send("Erro ao deletar o usuário sem permissão")
                            );

                    } else {

                        let name = snap_student.val().nome;

                        registrarAcesso("O(a) aluno(a) " + name + " acessou a página de " + page + " com o telefone " + phone);

                        response.send("Usuário tem permissão de aluno");

                    }

                });

            } else {

                let name = snap_admin.val().nome;

                registrarAcesso("O(a) administrador(a) " + name + " acessou a página de " + page + " com o telefone " + phone);

                response.send("Usuário tem permissão de administrador");

            }
        });
    }

    var registrarAcesso = (registro) => {
        admin.database().ref().child("acessos").push().set({
            registro: registro,
            timestamp: Date.now()
        });
    };
});

exports.OneSignal = functions.https.onRequest((request, response) => {
    const MS = 90000; // 1.5 Minutos

    var SendNotification = function (data) {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Basic MzAxN2U4ZWUtZTkxYy00ODFhLWEzMDAtOGY5MGJjMTgyOTJj"
        };

        var options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };

        var https = require('https');

        var req = https.request(options, res => {
            res.on('data', data => {
                response.send("Response: " + JSON.parse(data));
            });
        });

        req.on('error', e => {
            response.send(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    };

    var VerifyTimestamp = function (snap) {
        var time = new Date().getTime() - snap.val().timestamp;

        var message = {
            app_id: "71f7bd3c-15da-4a04-a0fd-2dadf8cdfc8b",
            contents: {
                "en": snap.val().registro
            },
            included_segments: ["All"]
        };

        if (time <= MS) {
            // Enviar notificação pelo OneSignal
            // SendNotification(message);

            response.send(snap.val().registro);
        } else {
            response.send("Nenhum registro foi encontrado");
        }
    }

    admin.database().ref().child("registros").endAt().limitToLast(1).on("child_added", snap => {
        VerifyTimestamp(snap);
    });
});