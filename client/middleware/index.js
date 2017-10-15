import { Platform } from "react-native";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import firebase from "./firebase";
import next from "./next";

const middleware = [thunk, firebase];

// XCode console is very noisy with redux state, turn it off there
if (Platform.OS != "ios" && process.env.NODE_ENV === "development") {
    middleware.push(createLogger());
}

middleware.push(next);

export default applyMiddleware.apply(this, middleware);
