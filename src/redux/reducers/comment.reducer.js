import { COMMENT_LIST_FAIL, COMMENT_LIST_REQUEST, COMMENT_LIST_SUCCESS, SET_SUBSCRIPTION_STATUS } from "../actionTypes";

export const commentReducer = (prevState={
    loading:false,
    comments:[],
    error:null
},action) => {
    const {type, payload} = action;

    switch(type){
        case COMMENT_LIST_REQUEST:
            return {
                ...prevState,
                loading:true,
                error:null
            }
        case COMMENT_LIST_SUCCESS:
            return {
                ...prevState,
                loading:false,
                comments:payload,
                error:null
            }
        case COMMENT_LIST_FAIL:
            return {
                ...prevState,
                loading:false,
                error:payload
            }
        default:
            return prevState;
    }
}