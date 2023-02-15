import { createAction } from "@reduxjs/toolkit";

const update = createAction("task/updated")
const remove = createAction("task/remove")

export function taskCompleted(id){
    return update({id, completed: true })
}
export function changedTitle(id){
    return update({id, title:`New title for ${id}`})
}
export function deletedTitle(id) {
    return remove(id)
}

function reducer (state, action){
    switch(action.type) {
        case update.type:
            const newArray = [...state]
            const elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex]= {...newArray[elementIndex], ...action.payload}
            return newArray
        case remove.type:
            return state.filter((e) => e.id !== action.payload.id);
        default:
            return state;
    }
}
export default reducer