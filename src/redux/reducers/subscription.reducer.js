import { SUBSCRIBED_VIDEO_FAIL, SUBSCRIBED_VIDEO_REQUEST, SUBSCRIBED_VIDEO_SUCCESS } from "../actionTypes";


const initialState = {
    loading:false,
    videos:null,
    error:null
}

export const subscriptionReducer = (prevState=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case SUBSCRIBED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case SUBSCRIBED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading:false,
                videos:payload,
                error:null
            }
        case SUBSCRIBED_VIDEO_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    }
}