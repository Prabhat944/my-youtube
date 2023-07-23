import firebase from "../../firebase.auth";
import { LOAD_PROFILE, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../actionTypes";


export const login = () => async dispatch => {
    try{
        dispatch({
            type:LOGIN_REQUEST,
        })
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
        const res = await firebase.auth().signInWithPopup(provider);
        const accessToken = res.credential.accessToken;
            console.log('access',res)
        const profile = {
            name:res.additionalUserInfo.profile.name,
            photoURL:res.additionalUserInfo.profile.picture
        };

        sessionStorage.setItem('yt-access-token',accessToken);
        sessionStorage.setItem('yt-userInfo',JSON.stringify(profile));

        dispatch({
            type:LOGIN_SUCCESS,
            payload:accessToken
        });
        dispatch({
            type:LOAD_PROFILE,
            payload:profile
        })
    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.message
        })
    }
}

export const logout = () => async dispatch => {
    try{
        sessionStorage.removeItem('yt-access-token');
        sessionStorage.removeItem('yt-userInfo');
        dispatch({
            type:LOGOUT,
        });
        await firebase.auth.signout();

    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.message
        })
    }
}