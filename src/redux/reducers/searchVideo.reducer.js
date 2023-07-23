import { SEARCHED_UPDATE_KEYWORD, SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS } from "../actionTypes";

const initialState = {
    loading:false,
    videos:null,
    nextPageToken:null,
    keyword:'',
    error:null
}


export const searchVideoReducer = (prevState=initialState,action) =>{
    const {type,payload} = action;
    switch(type){
        case SEARCHED_UPDATE_KEYWORD:
            return {
                ...prevState,
                keyword:payload
            }
        case SEARCHED_VIDEO_REQUEST:
            return{
                ...prevState,
                loading:true
            }
        case SEARCHED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading:false,
                videos:(payload.keyword === prevState.keyword) ? 
                [...prevState.videos,...payload.video] : payload.video,
                keyword:payload.keyword,
                nextPageToken: payload.nextPageToken
            }
        case SEARCHED_VIDEO_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    };
}