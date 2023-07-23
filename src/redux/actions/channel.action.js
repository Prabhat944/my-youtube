import Api_Request from "../../api"
import { CHANNEL_DETAILS_FAIL, CHANNEL_DETAILS_REQUEST, CHANNEL_DETAILS_SUCCESS, CHANNEL_VIDEO_FAIL, CHANNEL_VIDEO_REQUEST, CHANNEL_VIDEO_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes"




export const getChannelDetails = (id) => async dispatch => {
    try{
        dispatch({
            type: CHANNEL_DETAILS_REQUEST,
        });

        const {data} = await Api_Request('/channels',{
            params:{
                part:'snippet,statistics,contentDetails',
                id
            }
        });

        dispatch({
            type: CHANNEL_DETAILS_SUCCESS,
            payload:data.items[0]
        });

    }catch(error){
        console.log(error.response.data);
        dispatch({
            type: CHANNEL_DETAILS_FAIL,
            payload:error.response.data
        });
    }
};

export const checkSubscriptionStatus = (id) => async (dispatch,getState) => {
    try{
        const {data} = await Api_Request('/subscriptions',{
            params:{
                part:'snippet',
                forChannelId:id,
                mine:true
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            }
        });

        dispatch({
            type: SET_SUBSCRIPTION_STATUS,
            payload: data.items.length !== 0,
        });
       console.log('subs',data)
    }catch(error){
        console.log(error.response.data);

    }
};


export const getVideoByChannel = (id) => async dispatch => {
    try{
        dispatch({
            type:CHANNEL_VIDEO_REQUEST
        })

        const {data:{items}} = await Api_Request('/channels',{
            params:{
            part:'contentDetails',
            id:id}
        });

        const uploadPlaylistId = items[0]?.contentDetails?.relatedPlaylists.uploads 

        const {data} = await Api_Request('/playlistItems',{
            params:{
            part:'contentDetails,snippet',
            playlistId:uploadPlaylistId,
            maxResults:30
        },
        });
        dispatch({
            type:CHANNEL_VIDEO_SUCCESS,
            payload:data?.items
        })
    }catch(error){
        console.log(error.response?.data.message)
        dispatch({
            type:CHANNEL_VIDEO_FAIL,
            payload:error.response?.data.message
        })
    }
}