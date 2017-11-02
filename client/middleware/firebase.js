import firebase from "react-native-firebase";

export default store => next => action => {
    if (action.firebase) {
        const { authenticate } = store.getState();

        if (authenticate.user != null) {
            const { path, data, subpaths } = action.firebase;

            if (path.length > 0) {
                var ref = firebase
                    .database()
                    .ref(path)
                    .child(authenticate.user.uid);

                if (subpaths) {
                    for (var i = 0; i < subpaths.length; ++i) {
                        ref = ref.child(subpaths[i]);
                    }
                }

                return ref.set(data).then(() => next(action));
            } else {
                return Promise.reject(new Error("wrong database path"));
            }
        } else {
            return Promise.reject(new Error("not logged in"));
        }
    } else {
        return next(action);
    }
};
