import React, { useEffect, useState } from 'react'
import './_videoHorizontal.scss';
import {Row, Col} from 'react-bootstrap'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import moment from 'moment';
import {AiFillEye} from 'react-icons/ai'
import numeral from 'numeral';
import Api_Request from '../../api';
import { useNavigate } from 'react-router-dom';

const VideoHorizonal = ({video}) => {
  const {title, channelId, publishedAt, publishTime, channelTitle, thumbnails} = video?.snippet || {};
  const navigate = useNavigate();
  const [views,setViews] = useState(null);
  const [duration,setDuration] = useState(null);
  const [channelIcon,setChannelIcon] = useState(null)

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');

  const watchHandler = () => {
    navigate(`/watch/${video?.id?.videoId}`)
  };
  const get_video_detail = async() =>{
    const {data:{items}} = await Api_Request('/videos',{
       params:{
         part:'contentDetails,statistics',
         id:video?.id?.videoId
       }
     })
 
     setDuration(items[0].contentDetails.duration);
     setViews(items[0].statistics.viewCount);
   };

  const get_channel_icon = async() =>{
  const {data:{items}} = await Api_Request('/channels',{
      params:{
        part:'snippet',
        id:channelId
      }
    })

    setChannelIcon(items[0].snippet.thumbnails.default)
  };

   useEffect(()=>{
    if(video?.id?.videoId){
      get_video_detail();
    }
   },[video?.id]);

   useEffect(()=>{
    if(channelId){
    get_channel_icon();
    }
  },[channelId]);

  return (
    <Row className='videoHorizontal m-1 py-2 align-items-center' onClick={watchHandler}>
      <Col xs={6} md={6} className='videoHorizontal__left'>
        <LazyLoadImage
          src={thumbnails?.medium?.url}
          effect='blur'
          className='videoHorizontal__thumbnail'
          wrapperClassName='videoHorizontal__thumbnail_wrapper' />
          <span className='videoHorizontal__duration'>{_duration}</span>
      </Col>
      <Col xs={6} md={6} className='videoHorizontal__right p-0'>
        <p className='videoHorizontal__title mb-1'>
          {title}
        </p>
        <div className='videoHorizontal__details'>
          <AiFillEye />
          <span>{numeral(views).format('0.a')} Views </span> 
          <span>•</span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>
        <div className='videoHorizontal__channel d-flex align-item-center my-1'>
        {/* <LazyLoadImage
          src='https://image.shutterstock.com/image-photo/attractive-young-girl-wearing-casual-260nw-1408503164.jpg'
          effect='blur'
          className='videoHorizontal__thumbnail'
          wrapperClassName='videoHorizontal__thumbnail_wrapper' /> */}

          <p>{channelTitle}</p>
        </div>
      </Col>
    </Row>
  )
}

export default VideoHorizonal
