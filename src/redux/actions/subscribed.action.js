import Api_Request from "../../api"
import { SUBSCRIBED_VIDEO_FAIL, SUBSCRIBED_VIDEO_REQUEST, SUBSCRIBED_VIDEO_SUCCESS } from "../actionTypes"




export const getSubscribedList = () => async (dispatch,getState) => {
    try{
        dispatch({
            type: SUBSCRIBED_VIDEO_REQUEST,
        });

        const {data} = await Api_Request('/subscriptions',{
            params:{
                part:'snippet,contentDetails',
                mine:true
            },
            headers:{
                Authorization:`Bearer ${getState().auth?.accessToken}`
            }

        });

        dispatch({
            type: SUBSCRIBED_VIDEO_SUCCESS,
            payload:data.items
        });

    }catch(error){
        console.log(error.response.data);
        dispatch({
            type: SUBSCRIBED_VIDEO_FAIL,
            payload:error.response.data
        });
    }
};
