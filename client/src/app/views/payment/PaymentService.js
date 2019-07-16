import firebase from "../../authentication/FirebaseConfig";

export const createNewSubscription = (sourceId,customerId,plan) => {
    return firebase.functions().httpsCallable("createNewSubscription")({sourceId,customerId,plan});
}

