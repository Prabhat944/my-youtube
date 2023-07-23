import React, { useEffect } from 'react'
import './_subscriptionScreen.scss';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscribedList } from '../../redux/actions/subscribed.action';
import VideoHorizonal from '../../components/videoHorizontal/VideoHorizonal';
import SkeltonHorizontalVideo from '../../components/skelton/SkeltonHorizontal';
import ErrorBoundry from '../../components/errorBoundry/ErrorBoundry';

const SubscriptionScreen = () => {
    const dispatch =useDispatch();
    const {videos,loading} = useSelector(state=>state.sunscribedVideo);


    useEffect(()=>{
        dispatch(getSubscribedList())
    },[]);

  return (
    <Container fluid>
      <ErrorBoundry title='Subscription video list'>
        {videos?.length > 0 &&
        videos?.map((video)=><VideoHorizonal video={video} subScreen={true} />)}
        </ErrorBoundry>
        <ErrorBoundry title='Subscription video list skelton'>
        {loading && 
        [...Array(20)].map(()=><SkeltonHorizontalVideo /> )}
        </ErrorBoundry>
    </Container>
  )
}

export default SubscriptionScreen
