import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    entities:[],
}
const errorSlice = createSlice({
    name: "error",
    initialState,
    reducer:{
        set(state, action){
            state.entities.push(action.payload)
        }
    }
})
const { reducer: errorReducer, actions } = errorSlice
const { set } = actions

export const setError = (message) => (dispatch) => {
    dispatch(set(message));
}
export default errorReducer;