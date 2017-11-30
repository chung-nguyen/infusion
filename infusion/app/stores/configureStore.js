import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducer";
import saga from "../sagas";

const config = {
    key: 'root',
    blacklist: ["authenticate", "appNav"],
    storage,
};

const reducer = persistCombineReducers(config, reducers);

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(reducer,
            applyMiddleware(sagaMiddleware, logger)),
        runSaga: sagaMiddleware.run(saga)
    };
};

const store = configureStore();

export default store;
