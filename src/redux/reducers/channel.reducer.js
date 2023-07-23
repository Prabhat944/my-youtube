import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_VIDEO_FAIL, CHANNEL_VIDEO_REQUEST, CHANNEL_VIDEO_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes";

export const channelReducer = (prevState={
    loading:false,
    channel:{},
    video:[],
    subscriptionStatus:false,
    error:null
},action) => {
    const {type, payload} = action;

    switch(type){
        case CHANNEL_DETAILS_REQUEST:
            return {
                ...prevState,
                loading:true,
                error:null
            }
        case CHANNEL_DETAILS_SUCCESS:
            return {
                ...prevState,
                loading:false,
                channel:payload,
                error:null
            }
        case CHANNEL_DETAILS_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        case SET_SUBSCRIPTION_STATUS:
            return {
                ...prevState,
                subscriptionStatus:payload
            }
        case CHANNEL_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true
            }
        case CHANNEL_VIDEO_SUCCESS:
            return {
                ...prevState,
                video:payload,
                loading:false
            }
        case CHANNEL_VIDEO_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    }
}