import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import Video from '../../components/video/Video'
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/videos.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import SkeltonVideo from '../../components/skelton/SkeltonVideo';

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
        <CategoriesBar />
          <InfiniteScroll
          dataLength={videos.length}
          next={fetchData}
          hasMore={true}
          loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
          }
          >
            <Row>
            {!loading ? 
            videos.map((video)=>(
                <Col key={video.id} xs={12} sm={6} md={4} lg={3} >
                <Video video={video} />
                </Col>
            ))
            :
            [...Array(20)].map(()=>(
              <Col xs={12} sm={6} md={4} lg={3} >
              <SkeltonVideo/>
              </Col>
            ))}
            </Row>
          </InfiniteScroll>
    </Container>
  )
}

export default HomeScreen
