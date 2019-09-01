import Firebase from "firebase/app"

import "firebase/auth"
import "firebase/storage"
import "firebase/database"
import "firebase/performance"

export const firebase = Firebase;

const fb = Firebase.initializeApp({
    apiKey: "AIzaSyC9NAnzX-3nUKcn5SKWUIiiBMOCn40CISM",
    authDomain: "acaofilosofica.firebaseapp.com",
    databaseURL: "https://acaofilosofica.firebaseio.com",
    projectId: "acaofilosofica",
    storageBucket: "acaofilosofica.appspot.com",
    messagingSenderId: "514558626996",
    appId: "1:514558626996:web:af504cdb1c9ea8b6"
});

export const db = fb.database();
export const auth = fb.auth();
export const storage = fb.storage();