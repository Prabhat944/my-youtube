import { RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS } from "../actionTypes";


const initialState = {
    loading:false,
    video:[],
    nextPageToken:null,
    error:null
}

export const relatedVideoReducer = (prevState=initialState,action) => {
    const {type,payload} = action;

    switch(type){
        case RELATED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true,
                error:null
            }
        case RELATED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading:false,
                video:payload.video,
                nextPageToken: payload.nextPageToken,
                error:null
            }
        case RELATED_VIDEO_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    }
}