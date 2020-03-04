const middlewareLogger = store => next => action => {
    console.log('Original State:', store.getState());
    console.log('Current Action:', action);
    next(action);
    console.log('New Updated State:', store.getState());
  };
  
  export default middlewareLogger;









// This basic middleware is doing a few things:

// First it logs the current state of our store to the console.

// Then it logs the action that was dispatched to invoke it.

// We then call next(), and pass in our action. This instructs Redux to continue its normal 'workflow'. (Allowing the action to // ??// continue to the reducer).

// Finally, we log the results of store.getState() again to see how state has changed after we "unpause" and allow the action to 
// reach the reducer.