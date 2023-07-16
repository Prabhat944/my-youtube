import Api_Request from "../../api";
import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, CREATE_COMMENT_FAIL, CREATE_COMMENT_SUCCESS } from "../actionTypes";



export const getCommentOfVideoById = (id) => async dispatch => {
    try{
        dispatch({
            type: COMMENT_LIST_REQUEST,
        });

        const {data} = await Api_Request('/commentThreads',{
            params:{
                part:'snippet',
                videoId:id
            }
        });

        dispatch({
            type: COMMENT_LIST_SUCCESS,
            payload:data.items
        });

    }catch(error){
        console.log(error.response.data);
        dispatch({
            type: COMMENT_LIST_FAIL,
            payload:error.response.data
        });
    }
};

export const addComment = (id,text) => async (dispatch,getState) => {
    try{
        const payload = {
            snippet:{
                videoId:id,
                topLevelComment:{
                    snippet:{
                        textOriginal:text
                    }
                }
            }
        }
        await Api_Request.post('/commentThreads',payload,{
            params:{
                part:'snippet',
            },
            headers:{
                Authorization:`Bearer ${getState().auth.accessToken}`
            }
        });

        dispatch({
            type: CREATE_COMMENT_SUCCESS,
        });
        
        setTimeout(()=>dispatch(getCommentOfVideoById(id)),6000)

    }catch(error){
        console.log(error.response.data);
        dispatch({
            type: CREATE_COMMENT_FAIL,
            payload:error.response.data
        });
    }
};