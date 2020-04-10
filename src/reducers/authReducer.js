// Initial auth state
const authState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: ''    
}

const authReducer = (state=authState, action) =>{
    switch(action.type){
        case "LOGIN":
            let user = action.payload;
            state = user
            break;
        case "LOGOUT":
            state = {userId:'', firstName:'', lastName:'', email:'', username:''}
            break;
        default:
            state = {...state}        
            break;
    }
    return state;
}

export {authReducer};