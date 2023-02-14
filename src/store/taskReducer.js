import {taskUpdated, taskDelete} from "./actionTypes";

export function taskReducer (state,action){
    let newArray;
    let elementIndex;
    switch(action.type) {
        case taskUpdated:
            newArray = [...state]
            elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex]= {...newArray[elementIndex], ...action.payload}
            return newArray
        case taskDelete:
            newArray = [...state].filter((e)=> e.id !== action.payload.id)
            console.log(newArray);
            return newArray
        default:
            return state;
    }
}