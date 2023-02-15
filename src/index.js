import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import * as task from "./store/task";
import configureStore from "./store/store";



const store = configureStore()
const App = () => {
    const [state, setState] = useState(store.getState())
    useEffect(()=>{
        store.subscribe(()=>{
            setState(store.getState())
            })
    },[])
    const taskComplete = (taskId) => {
        store.dispatch(task.taskComplete(taskId))
    }
    const changeTitle = (taskId) => {
        store.dispatch(task.changeTitle(taskId))
    }
    const deleteTitle = (taskId) => {
        store.dispatch(task.deleteTitle(taskId))
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
                        <button
                            onClick={()=>deleteTitle(el.id)}
                        >
                            Delete title
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

