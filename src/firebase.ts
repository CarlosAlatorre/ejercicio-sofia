import firebase from "firebase"

firebase.initializeApp({
  apiKey: "AIzaSyD7xMZIY-5wiq8vpsAXf4M3xnN8KWRxf3s",
  authDomain: "ejercicio-sofia.firebaseapp.com",
  projectId: "ejercicio-sofia",
  storageBucket: "ejercicio-sofia.appspot.com",
  messagingSenderId: "378697189982",
  appId: "1:378697189982:web:4a76f3c60c6ecb18b142cf"
})

const db = firebase.firestore();
const auth = firebase.auth()

export {
  db,
  auth
}
