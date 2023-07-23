import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import './_searchScreen.scss';
import { getSearchedVideo } from '../../redux/actions/videos.action';
import VideoHorizontal from '../../components/videoHorizontal/VideoHorizonal';
import SkeltonHorizontal from '../../components/skelton/SkeltonHorizontal';
import InfiniteScroll from 'react-infinite-scroll-component';
import ErrorBoundry from '../../components/errorBoundry/ErrorBoundry';


let currReq=null;
const SearchScreen = () => {
   const dispatch = useDispatch();
   const {query} = useParams();
   const {videos,loading,keyword} = useSelector(state=>state.searchVideos);

   const debounceHandler = (keyword,refresh,delay) => {
    if(currReq){
        clearTimeout(currReq);
    }
    currReq = setTimeout(()=>{
        dispatch(getSearchedVideo(keyword,refresh));
    },delay)
   };

   const fetchData = () => {
    debounceHandler(keyword,false,600);
   };

    useEffect(()=>{

        debounceHandler(keyword,true,600);
    },[query, keyword]);

  return (
    <Container>
      <ErrorBoundry title={'Search Screen'} >
        <InfiniteScroll
          dataLength={videos?.length || 0}
          next={fetchData}
          hasMore={true}
          loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
          }
          >
            <ErrorBoundry title="Video list">
            {videos?.length > 0 && videos?.map((video)=>(
                <VideoHorizontal key={video?.id?.videoId} video={video} searchScreen={true} />
            ))}
            </ErrorBoundry>
            <ErrorBoundry title="search Video list skelton">
            {!loading && [...Array(20)].map(()=>(
                <SkeltonHorizontal searchScreen={true} />
            ))
             }
             </ErrorBoundry>
        </InfiniteScroll>
        </ErrorBoundry>
    </Container>
  )
}

export default SearchScreen
