import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from "./store/createStore";
function taskReducer (state,action){
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


const store = createStore(taskReducer,[{id:1, title: "Task 1", completed: false},
    {id:2, title: "Task 2", completed: false}]);
const App = () => {
    const [state, setState] = useState(store.getState())
    useEffect(()=>{
        store.subscribe(()=>{
            setState(store.getState())
            })
    },[])
    const taskComplete = (taskId) => {
        store.dispatch({
            type: "task/updated",
            payload: {id: taskId, completed: true }
        })
    }
    const changeTitle = (taskId) => {
        store.dispatch({
            type: "task/updated",
            payload: {id: taskId, title:`New title for ${taskId}`}
        })
    }
    return (<>
            <h1>App</h1>

            <ul>
                {state.map((el) =>
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <hr/>
                        <button
                            onClick={()=>taskComplete(el.id)}
                        >
                            Completed
                        </button>
                        <button
                            onClick={()=>changeTitle(el.id)}
                        >
                            Change title
                        </button>
                    </li>
                )}
            </ul>
    </>


    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

