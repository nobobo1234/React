import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyD35mSKACuABFE3847ZKPAatDcFgsQ9O4I",
    authDomain: "nolaplanner-481f1.firebaseapp.com",
    databaseURL: "https://nolaplanner-481f1.firebaseio.com",
    projectId: "nolaplanner-481f1",
    storageBucket: "nolaplanner-481f1.appspot.com",
    messagingSenderId: "65840282873"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
