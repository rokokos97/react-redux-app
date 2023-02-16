import { createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todosService";
import {setError} from "./errors";

const initialState = {
    entities:[],
    isLoading: true
}
const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers:{
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
        taskRequestFailed(state){
            state.isLoading = false
        },
        taskAdd(state, action){
            state.entities.push(action.payload)
            state.isLoading = false
        }

    }})
const { reducer, actions }=taskSlice
const { update, remove, received, taskRequested, taskRequestFailed, taskAdd } = actions
export const addTasks = (task) => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.get(task);
        dispatch(taskAdd(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}
export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch();
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}
export const completeTask =
    (id) =>
        (dispatch) => {
            return dispatch(update({id, completed: true }))
}

export function changedTitle(id){
    return update({id, title:`New title for ${id}`})
}
export function deletedTitle(id) {
    return remove({id})
}
export const getTasks = () => (state) => state.task.entities
export const getTaskLoadingStatus = () => (state) => state.task.isLoading
export const getError = ()=> (state) =>state.errors.entities[0]
export default reducer;

