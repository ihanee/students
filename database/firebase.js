import firebase from "firebase";

import 'firebase/firestore';





var firebaseConfig = {
    apiKey: "AIzaSyDhoJ8hrn7CCl8hGmsLs8QJOpRGXKAa2Do",
    authDomain: "react-native-13711.firebaseapp.com",
    projectId: "react-native-13711",
    storageBucket: "react-native-13711.appspot.com",
    messagingSenderId: "144716022052",
    appId: "1:144716022052:web:0cf5008a0ca82f14bdb3b1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export default {
      firebase,
      db

  }