var initState = {
    userInfo: {},
};

function reducer(state = initState, action){
    return {
        userInfo: userInfo(state.userInfo, action),
         //prefix: 'http://127.0.0.1:9002',
        prefix: ''
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
