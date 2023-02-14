import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';

function taskReducer (state,action){
    let newArray;
    let elementIndex;
    switch(action.type) {
        case "task/completed" :
            newArray = [...state]
            elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex].completed = true;
            return newArray
        case "task/updated":
            newArray = [...state]
            elementIndex = newArray.findIndex((e) => e.id === action.payload.id)
            newArray[elementIndex]= {...newArray[elementIndex], ...action.payload}
            return newArray
        default:
            break;
    }
}

function createStore(reducer,initialState) {
    let state = initialState;
    let listeners = [];
    function getState() {
        return state
    }
    function dispatch(action) {
        state = reducer(state, action)
        for(let i=0; i<listeners.length; i++){
            const listener = listeners[i];
            listener();
        }
    }
    function subscribe(listener) {
        listeners.push(listener)
    }
    return {getState, dispatch, subscribe}
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
            type: "task/completed",
            payload: {id: taskId}
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

