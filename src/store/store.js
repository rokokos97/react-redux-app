import reducer from "./task";
import {logger} from "./middlewere/logger";
import {configureStore} from "@reduxjs/toolkit"

function createStore () {
    return configureStore({
        reducer,
        middleware: (getDefaultMiddleware)=>
            getDefaultMiddleware().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    })
}
export default createStore;
