import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./task";
import {logger} from "./middlewere/logger";
import {thunk} from "./middlewere/thunk";

const middlewareEnhancer = applyMiddleware(logger,thunk)
function configureStore () {
    return createStore(
        reducer,compose(middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
}
export default configureStore;
