export function taskReducer (state,action){
    switch(action.type) {
        case "task/updated":
            const newArray = [...state]
            const elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex]= {...newArray[elementIndex], ...action.payload}
            return newArray
        default:
            break;
    }
}