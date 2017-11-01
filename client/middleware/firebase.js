import firebase from "react-native-firebase";

export default store => next => action => {
    if (action.firebase) {        
        const { authenticate } = store.getState();

        if (authenticate.user != null) {
            const { path, data } = action.firebase;

            const ref = firebase.database().ref(path);
            return ref.child(authenticate.user.uid).set(data).then(() => next(action));
        } else {
            return Promise.reject(new Error("not logged in"));
        }
    } else {
        return next(action);
    }
};
