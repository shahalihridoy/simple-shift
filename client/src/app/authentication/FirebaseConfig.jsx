import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBR0Y1wCk85gYmilrr-VNR5GiErhgU67LA",
  authDomain: "shiftsimple-unity-test.firebaseapp.com",
  databaseURL: "https://shiftsimple-unity-test.firebaseio.com",
  projectId: "shiftsimple-unity-test",
  storageBucket: "shiftsimple-unity-test.appspot.com",
  messagingSenderId: "631167171614",
  appId: "1:631167171614:web:ff435b3375973ff6"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
