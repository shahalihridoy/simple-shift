import firebase from "../../authentication/FirebaseConfig";
import { Store } from "../../redux/Store";
import { SET_USER } from "../../redux/actions/Types";

const dispatchFunction = user => ({ type: SET_USER, data: user });

export const loadUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase
        .database()
        .ref(`Organisations/${user.uid}`)
        .on("value", snapshot => {
          Store.dispatch(
            dispatchFunction({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              ...snapshot.val()
            })
          );
        });
    } else {
      Store.dispatch(
        dispatchFunction({
          ...user
        })
      );
    }
  });
};

export const uploadProfilePhoto = (file, uid) => {
  return firebase
    .storage()
    .ref(`profilePhoto/${uid}/${file.name}`)
    .put(file);
};

export const sendUserDataInFirebase = (data, uid) => {
  return firebase
    .database()
    .ref(`Organisations/${uid}`)
    .update({ ...data });
};

export const setCandidate = (data, uid) => {
  let { seat1, pass1, seat2, pass2 } = data;
  return firebase
    .database()
    .ref(`Organisations/${uid}/candidates`)
    .update({
      one: {
        seat1,
        pass1,
        status: "active"
      },
      two: {
        seat2,
        pass2,
        status: "active"
      }
    });
};

export const cancelSubscription = subscriptionId => {
  return firebase.functions().httpsCallable("cancelSubscription")({
    subscriptionId
  });
};
