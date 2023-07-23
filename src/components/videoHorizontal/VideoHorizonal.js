import React, { useEffect, useState } from 'react'
import './_videoHorizontal.scss';
import {Row, Col} from 'react-bootstrap'
import {LazyLoadImage} from 'react-lazy-load-image-component'
import moment from 'moment';
import {AiFillEye} from 'react-icons/ai'
import numeral from 'numeral';
import Api_Request from '../../api';
import { useNavigate } from 'react-router-dom';

const VideoHorizonal = ({video, searchScreen, subScreen}) => {
  const {title, channelId, publishedAt, publishTime, description, channelTitle, thumbnails, resourceId} = video?.snippet || {};
  const navigate = useNavigate();
  const [views,setViews] = useState(null);
  const [duration,setDuration] = useState(null);
  const [channelIcon,setChannelIcon] = useState(null)

  const isVideo = !(video?.id?.kind === 'youtube#channel' || subScreen);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');
  const _channelId = resourceId?.channelId || channelId;

  const watchHandler = () => {
    isVideo ? 
    navigate(`/watch/${video?.id?.videoId}`)
     : navigate(`/channel/${_channelId}`)
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

    setChannelIcon(items ? items[0].snippet.thumbnails.default : '')
  };

   useEffect(()=>{
    if(video?.id?.videoId && isVideo){
      get_video_detail();
    }
   },[video?.id,isVideo]);

   useEffect(()=>{
    if(channelId){
    get_channel_icon();
    }
  },[channelId]);
 
  return (
    <Row className='videoHorizontal m-1 py-2 align-items-center' onClick={watchHandler}>
      <Col xs={6} md={(searchScreen || subScreen)? 4 : 6} className='videoHorizontal__left'>
        <LazyLoadImage
          src={thumbnails?.medium?.url}
          effect='blur'
          className={isVideo ? 'videoHorizontal__thumbnail' : 'videoHorizontal__thumbnail-channel'}
          wrapperClassName='videoHorizontal__thumbnail_wrapper' />
          {isVideo && <span className='videoHorizontal__duration'>{_duration}</span>}
      </Col>
      <Col xs={6} md={(searchScreen || subScreen)? 8 : 6} className='videoHorizontal__right p-0'>
        <p className='videoHorizontal__title mb-1'>
          {title}
        </p>
        {!subScreen && <div className='videoHorizontal__details'>
          <AiFillEye />
          <span>{numeral(views).format('0.a')} Views </span> 
          <span>•</span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>}

        {(subScreen && searchScreen) && <p className='mt-1 videoHorizontal__description'>
          {description}</p>}

        <div className='videoHorizontal__channel d-flex align-item-center my-1'>
        {isVideo && searchScreen && 
        <LazyLoadImage
          src={channelIcon?.url}
          effect='blur'
          />}

          <p>{channelTitle}</p>
        </div>
        {subScreen &&
          <p className='mt-2'>
            {
              video?.contentDetails?.totalItemCount
            }{' '}Videos
          </p>
        }
      </Col>
    </Row>
  )
}

export default VideoHorizonal
