import React from 'react';
import ReactDOM from 'react-dom/client';

function createStore(initialState) {
    let state = initialState;
    function getState(){
        return state
    }
    function dispatch(action){

    }
    return {getState, dispatch}
}
const store = createStore([{id:1, description: "Task 1", status: false}]);
const App = () => {
    console.log(store.getState());
    store.dispatch()
    return <h1>App</h1>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

