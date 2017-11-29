import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
// import createSagaMiddleware from "redux-saga";
import reducer from "./reducer";
// import saga from "../sagas";
import {Constants} from "expo";

//  Returns the store instance
// It can  also take initialState argument when provided
// const configureStore = () => {
//     const sagaMiddleware = createSagaMiddleware();
//     if (Constants.appOwnership !== 'standalone') {
//         return {
//             ...createStore(reducer,
//                 applyMiddleware(sagaMiddleware)),
//             // runSaga: sagaMiddleware.run(saga)
//         };
//     } else {
//         return {
//             ...createStore(reducer,
//                 applyMiddleware(sagaMiddleware)),
//             // runSaga: sagaMiddleware.run(saga)
//         };
//     }
// };

// const store = configureStore();

const store = createStore(reducer);

export default store;
