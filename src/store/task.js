const TASK_UPDATED = "task/updated"
const TASK_DELETED = "task/deleted"

export function taskComplete(id){
    return {
        type: TASK_UPDATED,
        payload: {id, completed: true }
    }
}
export function changeTitle(id){
    return {
        type: TASK_UPDATED,
        payload: {id, title:`New title for ${id}`}
    }
}
export function deleteTitle(id) {
    return {
        type: TASK_DELETED,
        payload: {id, title: `New title for ${id}`}
    }
}

function reducer (state, action){
    switch(action.type) {
        case TASK_UPDATED:
            const newArray = [...state]
            const elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex]= {...newArray[elementIndex], ...action.payload}
            return newArray
        case TASK_DELETED:
            return state.filter((e) => e.id !== action.payload.id);
        default:
            return state;
    }
}
