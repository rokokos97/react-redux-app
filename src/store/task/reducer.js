import {taskDeleted, taskUpdated} from "./actionTypes";

export function reducer (state, action){
    switch(action.type) {
        case taskUpdated:
            const newArray = [...state]
            const elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex]= {...newArray[elementIndex], ...action.payload}
            return newArray
        case taskDeleted:
            return state.filter((e) => e.id !== action.payload.id);
        default:
            return state;
    }
}