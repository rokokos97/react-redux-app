import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from "./store/store";
import {changedTitle, completeTask, deletedTitle, getTasks} from "./store/task";
import {Provider, useSelector} from "react-redux";



const store = configureStore()


const App = () => {
    const state = useSelector((state)=>state)
    useEffect(()=>{
        store.dispatch(getTasks())
    },[])
    const changeTitle = (taskId) => {
            store.dispatch(changedTitle(taskId))
    }
    const deleteTitle = (taskId) => {
        store.dispatch(deletedTitle(taskId))
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
                            onClick={()=>(store.dispatch(completeTask(el.id)))}
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
      <Provider store={store}>
    <App />
      </Provider>
  </React.StrictMode>
);

