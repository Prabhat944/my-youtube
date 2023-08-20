import { HOME_VIDEO_FAIL, HOME_VIDEO_REQUEST, HOME_VIDEO_SUCCESS, RELATED_VIDEO_FAIL, RELATED_VIDEO_REQUEST, RELATED_VIDEO_SUCCESS, SEARCHED_VIDEO_FAIL, SEARCHED_VIDEO_REQUEST, SEARCHED_VIDEO_SUCCESS, SELECTED_VIDEO_FAIL, SELECTED_VIDEO_REQUEST, SELECTED_VIDEO_SUCCESS } from "../actionTypes";
import Api_Request from "../../api";

export const getPopularVideos = () => async (dispatch,getState) => {
    
    try{
        dispatch({
            type:HOME_VIDEO_REQUEST
        });
        const {data} = await Api_Request.get('/videos',{
            params:{
                part:`snippet,contentDetails,statistics`,
                chart:`mostPopular`,
                regionCode:`IN`,
                maxResults:20,
                pageToken: getState().homeVideos.nextPageToken,
            }
        })
        
        dispatch({
            type:HOME_VIDEO_SUCCESS,
            payload:{
                videos:data.items,
                nextPageToken:data.nextPageToken,
                category:'All'
            }
        });

    }catch(error){
        console.log(error.message);
        dispatch({
            type:HOME_VIDEO_FAIL,
            payload:error.message
        })
    }
};

export const getVideoByCategory = (keyword) => async (dispatch,getState) => {
    
    try{
        dispatch({
            type:HOME_VIDEO_REQUEST
        });
        const {data} = await Api_Request.get('/search',{
            params:{
                part:`snippet`,
                maxResults:20,
                pageToken: getState().homeVideos.nextPageToken,
                q:keyword,
                type:'video'
            }
        })
        
        dispatch({
            type:HOME_VIDEO_SUCCESS,
            payload:{
                videos:data.items,
                nextPageToken:data.nextPageToken,
                category:keyword
            }
        });

    }catch(error){
        console.log(error.message);
        dispatch({
            type:HOME_VIDEO_FAIL,
            payload:error.message
        })
    }
};

export const getVideoDetailById = (id) =>async dispatch => {
    try{
       dispatch({
        type: SELECTED_VIDEO_REQUEST,
       });

       const {data} = await Api_Request('/videos',{
        params:{
            part:'snippet,statistics',
            id:id
        }
       });

       dispatch({
        type: SELECTED_VIDEO_SUCCESS,
        payload:data.items[0]
       });
    }catch(error){
        console.log(error.message);
        dispatch({
            type: SELECTED_VIDEO_FAIL,
           });
    }
};


export const getRelatedVideo = id => async dispatch =>{
    try{
        dispatch({
            type:RELATED_VIDEO_REQUEST
        });

        const {data} = await Api_Request('/search',{
            params:{
                part:'snippet',
                // relatedToVideoId:id,
                maxResults:15,
                type:'video'
            }
        });

        dispatch({
            type:RELATED_VIDEO_SUCCESS,
            payload:{
                video:data.items,
                nextPageToken:data.nextPageToken
            }
        });
        
    }catch(error){
        console.log(error.response.data.message)
        dispatch({
            type:RELATED_VIDEO_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getSearchedVideo = (keyword,refresh) => async (dispatch,getState) =>{
    try{
        dispatch({
            type:SEARCHED_VIDEO_REQUEST
        });

        const {data} = await Api_Request.get('/search',{
            params:{
                part:`snippet`,
                maxResults:25,
                pageToken:!refresh ? getState().searchVideos.nextPageToken : '',
                q:keyword,
                type:'channel,video'

            }
        })
        
        dispatch({
            type:SEARCHED_VIDEO_SUCCESS,
            payload:{
                video:data?.items,
                nextPageToken:data?.nextPageToken,
                keyword:keyword
            }
        });
        
    }catch(error){
        console.log(error.response.data.message)
        dispatch({
            type:SEARCHED_VIDEO_FAIL,
            payload:error.response.data.message
        })
    }
}
