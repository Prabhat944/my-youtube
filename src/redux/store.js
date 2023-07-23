import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { authReducer } from './reducers/auth.reducer';
import { homeVideoReducer, selectedVideoReducer } from './reducers/videos.reducer';
import { channelReducer } from './reducers/channel.reducer';
import { commentReducer } from './reducers/comment.reducer';
import { relatedVideoReducer } from './reducers/relatedVideo.reducer';
import { searchVideoReducer } from './reducers/searchVideo.reducer';
import {subscriptionReducer} from './reducers/subscription.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideoReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails:channelReducer,
    commentList:commentReducer,
    relatedVideo:relatedVideoReducer,
    searchVideos:searchVideoReducer,
    sunscribedVideo:subscriptionReducer
})
const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(thunk)));

export default store;