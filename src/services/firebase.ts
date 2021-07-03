import firebase from "firebase/app";

import 'firebase/auth';    //importo recurso de Autenticação -google
import 'firebase/database';//importo recurso de utilizar banco dados

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    // apiKey: "AIzaSyAxzhszgDwcotY5mzPtq6MLtcqW6xn9H9M",
    // authDomain: "letmeask-74196.firebaseapp.com",
    // databaseURL: "https://letmeask-74196-default-rtdb.firebaseio.com",
    // projectId: "letmeask-74196",
    // storageBucket: "letmeask-74196.appspot.com",
    // messagingSenderId: "546501482265",
    // appId: "1:546501482265:web:4af46c007d1d10b4a95788"
  };

firebase.initializeApp(firebaseConfig); // inicializar App.

 const auth = firebase.auth();  //const "auth", para utilizar como firebase.auth()
 const database = firebase.database(); //const "database", para utilizar como firebase.auth()

export { firebase, auth, database }