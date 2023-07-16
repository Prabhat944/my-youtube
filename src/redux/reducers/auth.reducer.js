import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../actionTypes";

const initialState = {
    accessToken: sessionStorage.getItem('yt-access-token') ? sessionStorage.getItem('yt-access-token') : null,
    user: sessionStorage.getItem('yt-userInfo') ? JSON.parse(sessionStorage.getItem('yt-userInfo')) : null,
    loading:false,
    error:null,
}

export const authReducer = (prevState=initialState,action)=>{
    const {type,payload} = action;

    switch(type){
        case LOGIN_REQUEST:
            return {...prevState,loading:true};
        case LOGIN_SUCCESS:
            return {
                ...prevState,
                accessToken:payload,
                loading:false,
            }
        case LOGIN_FAIL:
            return {
                ...prevState,
                accessToken:null,
                loading:false, 
                error:payload 
            }
        case LOAD_PROFILE:
            return {
                ...prevState,
                user:payload
            }
        case LOGOUT:
            return {
                ...prevState,
                accessToken:null,
                user:null,
                error:null,
            }
        default:
            return prevState;
    }
};

