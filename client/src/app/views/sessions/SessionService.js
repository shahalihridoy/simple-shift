import firebase from "../../authentication/FirebaseConfig";

export const signinWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signupWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signOut = () => {
  return firebase.auth().signOut();
};
