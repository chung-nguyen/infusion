export default store => next => action => {
    if (action.firebase) {
        // TODO: implement firebase calls here    
        return next(action);
    } else {
        return next(action);        
    }
};
