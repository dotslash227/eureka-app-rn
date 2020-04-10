export function userLogin(user){
    return{
        type:'LOGIN',
        payload:user
    }
}

export function userLogout(){
    return{
        type:'LOGOUT',
        payload:''
    }
}