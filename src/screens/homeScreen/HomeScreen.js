import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video'
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/videos.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeltonVideo from '../../components/skelton/SkeltonVideo';
import ErrorBoundry from '../../components/errorBoundry/ErrorBoundry';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {videos, activeCategory, loading} = useSelector(state=>state.homeVideos);

  const fetchData = () =>{ 
    if(activeCategory === 'All'){
    dispatch(getPopularVideos());
    }else{
    dispatch(getVideoByCategory(activeCategory));
    }
  };

  useEffect(()=>{
    dispatch(getPopularVideos());
  },[dispatch])
  return (
    <Container>
      <ErrorBoundry title={"Home Screen"}>
        <ErrorBoundry title={'Category Bar'}>
           <CategoriesBar />
        </ErrorBoundry>
          <InfiniteScroll
          dataLength={videos?.length || 0}
          next={fetchData}
          hasMore={true}
          loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
          }
          >
            <Row>
            <ErrorBoundry title={'Video List'}>
            {videos?.length > 0 &&
            videos.map((video)=>(
                <Col key={`home-page-${video.id}`} xs={12} sm={6} md={4} lg={3} >
                <Video video={video} />
                </Col>
            ))}
            </ErrorBoundry>
            <ErrorBoundry title={'Video List Skelton'}>
            {loading &&
            [...Array(20)].map(()=>(
              <Col xs={12} sm={6} md={4} lg={3} >
              <SkeltonVideo/>
              </Col>
            ))}
            </ErrorBoundry>
            </Row>
          </InfiniteScroll>
          </ErrorBoundry>
    </Container>
  )
}

export default HomeScreen
