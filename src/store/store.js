import reducer from "./task";
import {logger} from "./middlewere/logger";
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import errorReducer from "./errors";
const rootReducer = combineReducers({
    error: errorReducer,
    task: reducer
})
function createStore () {
    return configureStore({
        rootReducer,
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    })
}
export default createStore;
