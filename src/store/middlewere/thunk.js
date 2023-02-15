export function thunk(state) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
          if(typeof action === "function"){
              console.log("function");
          }else{
              return next(action)
          }
        }
    }
}