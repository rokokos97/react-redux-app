import * as actions from "./actionTypes";

export function taskComplete(id){
    return {
        type: actions.taskUpdated,
        payload: {id, completed: true }
    }
}
export function changeTitle(id){
    return {
        type: actions.taskUpdated,
        payload: {id, title:`New title for ${id}`}
    }
}