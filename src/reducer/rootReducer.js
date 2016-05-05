var initState = {
    userInfo: {}
};

function reducer(state = initState, action){
    return {
        userInfo: userInfo(state.userInfo, action)
    }
}

function userInfo(state = {}, action){
    switch( action.type ){
        case 'userInfo':
            return Object.assign({}, state, action.field);
            break;
        default:
            return state;
    }
}

export default reducer;