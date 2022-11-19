import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD0WGLMyDSDScx0uxPyZkwJougwU2NUKLw",
  authDomain: "mymoney-97de7.firebaseapp.com",
  projectId: "mymoney-97de7",
  storageBucket: "mymoney-97de7.appspot.com",
  messagingSenderId: "765562977072",
  appId: "1:765562977072:web:777d886f3302072cb326f5"
};

  //init firebase

  firebase.initializeApp(firebaseConfig)

  //init service

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  //timestamps
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth , timestamp}