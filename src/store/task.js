import {createSlice} from "@reduxjs/toolkit";


const initialState = [
    {id:1, title: "Task 1", completed: false},
    {id:2, title: "Task 2", completed: false}
]
const completeTask = (taskId) =>(dispatch, getState)=> {
    dispatch(changedTitle(taskId))
}
const taskSlice = createSlice({name:"task",initialState,reducers:{
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
const { update, remove } = actions

export function taskCompleted(id){
    return update({id, completed: true })
}
export function changedTitle(id){
    return update({id, title:`New title for ${id}`})
}
export function deletedTitle(id) {
    return remove({id})
}
export default reducer;

