import React, { useEffect, useState } from 'react'
import "./_video.scss";
import {AiFillEye} from 'react-icons/ai'
import Api_Request from '../../api';
import {useNavigate} from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import moment from 'moment';
import numeral from 'numeral';

const Video = ({video}) => {
  const navigate = useNavigate();
  const {id,snippet:{channelId,channelTitle,title,publishedAt,thumbnails:{medium}}} = video
  const [views,setViews] = useState(null);
  const [duration,setDuration] = useState(null);
  const [channelIcon,setChannelIcon] = useState(null)

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format('mm:ss');
  const _videoId = id?.videoId || id;
  
  const get_video_detail = async() =>{
   const {data:{items}} = await Api_Request('/videos',{
      params:{
        part:'contentDetails,statistics',
        id:_videoId
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

   const watchVideoHandler = () => {
    navigate(`/watch/${_videoId}`);
   };

  useEffect(()=>{
    if(_videoId){
    get_video_detail();
    }
  },[_videoId]);

  useEffect(()=>{
    if(channelId){
    get_channel_icon();
    }
  },[channelId]);
  return (
    <div className='video' onClick={watchVideoHandler}>
      <div className='video__top'>
        {/* <img src={medium.url} alt=""/> */}
        <LazyLoadImage
          alt={''}
          effect="blur"
          src={medium.url} />
        <span className='video__top__duration'>{_duration}</span>
      </div>
      <div className='video__title'>
        {title}
      </div>
      <div className='video__details'>
        <span>
          <AiFillEye /> 
          <span>{numeral(views).format('0.a')}</span>
          <span> Views</span>
          <span> • </span>
          <span>{moment(publishedAt).fromNow()}</span>
        </span>
      </div>
      <div className='video__channel'>
        {/* <img alt='' src={channelIcon?.url} /> */}
        <span>
        <LazyLoadImage
          alt={''}
          effect="blur"
          src={channelIcon?.url} />
        </span>
        <p>{channelTitle}</p>
      </div>
    </div>
  )
}

export default Video;
