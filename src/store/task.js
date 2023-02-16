import {createAction, createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todosService";

const initialState = []

const taskRequested = createAction("task/requested");
const taskRequestFailed = createAction("task/requestFailed");
export const getTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch();
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed(error.message))
        console.log(error.message);

    }
}
export const completeTask =
    (id) =>
        (dispatch, getState) => {
            return dispatch(update({id, completed: true }))
}
const taskSlice = createSlice({name:"task",initialState,reducers:{
    received(state, action){
        return action.payload
    },
    update(state, action){
        const elementIndex = state.findIndex(
            (e) => e.id === action.payload.id
        );
        state[elementIndex] = {
            ...state[elementIndex],
            ...action.payload
    }},
    remove(state, action){
        return state.filter((e) => e.id !== action.payload.id)
    }
    }})
const { reducer, actions }=taskSlice
const { update, remove, received } = actions

export function changedTitle(id){
    return update({id, title:`New title for ${id}`})
}
export function deletedTitle(id) {
    return remove({id})
}
export default reducer;

