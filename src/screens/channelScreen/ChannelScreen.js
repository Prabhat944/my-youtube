import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelDetails, getVideoByChannel } from '../../redux/actions/channel.action';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import Video from '../../components/video/Video';
import ErrorBoundry from '../../components/errorBoundry/ErrorBoundry';
import SkeltonVideo from '../../components/skelton/SkeltonVideo';
import numeral from 'numeral';
import './_channelScreen.scss';

const ChannelScreen = () => {
    const dispatch = useDispatch();
    const {channelId} = useParams();
    const {video,loading, channel:{snippet, statistics}} = useSelector(state=>state.channelDetails);

    useEffect(()=>{
        dispatch(getVideoByChannel(channelId));
        dispatch(getChannelDetails(channelId));
    },[]);
    
  return (
    <>
    <div className='px-5 py-2 my-2 d-flex justify-content-between align-item-center channelHeader'>
      <div className='d-flex align-items-center channelHeader__left'>
        <img src={snippet?.thumbnails?.default?.url} alt='' />

        <div className='ml-3 channelFeader__details'>
          <h3>{snippet?.title}</h3>
          <span>
            {numeral(statistics?.subscriberCount).format('0.a')}{' '}subscribers
          </span>
        </div>
      </div>
      <button>Subscribe</button>
    </div>
   <Container>
    <Row className='mt-2'>
    <ErrorBoundry title={'Channel page'}>
    {video?.length && 
    video?.map((video)=>(
    <Col md={3} lg={3}>
      <Video video={video} channelScreen />
    </Col>
    ))}
     {loading && 
    [...Array(15)].map((video)=>(
      <Col md={3} lg={3}>
        <SkeltonVideo channelScreen />
      </Col>
    ))}
    </ErrorBoundry>
    </Row>
   </Container>
   </>
  )
}

export default ChannelScreen
