export default store => next => action => {
    const nextAction = action.next;
    delete action.next;

    return Promise.resolve(next(action)).then(res => {
        if (nextAction) {
            return {
                ...res,
                next: store.dispatch(nextAction)
            };
        }
        return res;
    });
};
