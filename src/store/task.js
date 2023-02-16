import {createAction, createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todosService";

const initialState = {
    entities:[],
    isLoading: true,
    error:null
}

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
        state.entities = action.payload
        state.isLoading = false
    },
    update(state, action){
        const elementIndex = state.entities.findIndex(
            (e) => e.id === action.payload.id
        );
        state.entities[elementIndex] = {
            ...state.entities[elementIndex],
            ...action.payload
    }},
    remove(state, action){
        return state.entities.filter((e) => e.id !== action.payload.id)
    },
    taskRequested(state){
            state.isLoading = true
        },
    taskRequestFailed(state, action){
        state.error = action.payload
        state.isLoading = false
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

