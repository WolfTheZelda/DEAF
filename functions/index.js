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

    if (user !== null && phone !== null) {
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

                        response.send("Usuário tem permissão de aluno");

                    }

                });

            } else {

                response.send("Usuário tem permissão de administrador");

            }
        });
    } else {
        response.send(404);
    }
});