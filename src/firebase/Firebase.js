import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD1_tZQdD4RYkvsyIYk4PVFMrQA-s1Fc64",
    authDomain: "dis-new-63cdb.firebaseapp.com",
    projectId: "dis-new-63cdb",
    storageBucket: "dis-new-63cdb.appspot.com",
    messagingSenderId: "860050691531",
    appId: "1:860050691531:web:fe8d7d4944721aab3d124e",
    measurementId: "G-0EE9G6T18G"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();

  export default db
  export {auth, provider}