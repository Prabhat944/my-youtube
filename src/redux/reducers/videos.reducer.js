import { HOME_VIDEO_FAIL, HOME_VIDEO_REQUEST, HOME_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";



const initialState ={
    videos:[],
    loading:false,
    nextPageToken:null,
    error:null,
    activeCategory:'All'
}


export const homeVideoReducer = (prevState=initialState,action) => {
    const {type, payload} = action;

    switch(type){
        case HOME_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true,
                error:null
            }
        case HOME_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading:false,
                videos:prevState.activeCategory === payload.category ? [...prevState.videos,...payload.videos] : payload.videos,
                nextPageToken:payload.nextPageToken,
                error:null,
                activeCategory:payload.category
            }
        case HOME_VIDEO_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState
    }
}

export const selectedVideoReducer = (prevState={
    loading:false,
    video:null,
    error:null
},action) => {
    const {type, payload} = action;

    switch(type){
        case SELECTED_VIDEO_REQUEST:
            return {
                ...prevState,
                loading:true,
                error:null
            }
        case SELECTED_VIDEO_SUCCESS:
            return {
                ...prevState,
                loading:false,
                video:payload,
                error:null
            }
        case SELECTED_VIDEO_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    }
}