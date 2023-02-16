import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import configureStore from "./store/store";
import {changedTitle, completeTask, deletedTitle, getTasks} from "./store/task";
import {Provider, useSelector, useDispatch} from "react-redux";



const store = configureStore()


const App = () => {
    const state = useSelector((state)=>state.task.entities)
    const isLoading = useSelector((state)=>state.task.isLoading)
    const error = useSelector((state)=>state.errors.entities[0])
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTasks())
    }, [])
    const changeTitle = (taskId) => {
            dispatch(changedTitle(taskId))
    }
    const deleteTitle = (taskId) => {
        dispatch(deletedTitle(taskId))
    }
    if(isLoading){
        return <h1>Loading</h1>
    }
    if(error){
        return <p>{error}</p>
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
                            onClick={()=>(dispatch(completeTask(el.id)))}
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

