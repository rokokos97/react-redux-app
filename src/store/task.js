import { createAction, createReducer} from "@reduxjs/toolkit";

const update = createAction("task/updated")
const remove = createAction("task/remove")

const initialState = [
    {id:1, title: "Task 1", completed: false},
    {id:2, title: "Task 2", completed: false}
]

export function taskCompleted(id){
    return update({id, completed: true })
}
export function changedTitle(id){
    return update({id, title:`New title for ${id}`})
}
export function deletedTitle(id) {
    return remove(id)
}
const reducer = createReducer(initialState,(builder) => {
    builder
        .addCase(update,(state,action)=>{
            const elementIndex = state.findIndex(
                (e) => e.id === action.payload.id
            );
            state[elementIndex]= {
                ...state[elementIndex],
                ...action.payload}
        })
        .addCase(remove,(state,action)=>{
            return state.filter((e) => e.id !== action.payload.id);
        })
})
export default reducer