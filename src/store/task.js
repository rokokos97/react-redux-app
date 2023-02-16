import {createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todosService";

const initialState = []
export const getTasks = () => async (dispatch) => {
    try {
        const data = await todosService.fetch();
        dispatch(set(data))
    } catch (error) {
        console.log(error.message);
    }
}
export const completeTask =
    (id) =>
        (dispatch, getState) => {
            return dispatch(update({id, completed: true }))
}
const taskSlice = createSlice({name:"task",initialState,reducers:{
    set(state, action){
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
const { update, remove, set } = actions

export function changedTitle(id){
    return update({id, title:`New title for ${id}`})
}
export function deletedTitle(id) {
    return remove({id})
}
export default reducer;

