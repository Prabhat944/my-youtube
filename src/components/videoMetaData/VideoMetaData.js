import React, { useEffect } from 'react'
import './_videoMetaData.scss';
import numeral from 'numeral';
import moment from 'moment';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import ShowMoreText from 'react-show-more-text';
import { useDispatch,useSelector } from 'react-redux';
import { checkSubscriptionStatus, getChannelDetails } from '../../redux/actions/channel.action';


const VideoMetaData = (props) => {
    const dispatch = useDispatch();
    const {channelId, channelTitle, description, title,publishedAt, thumbnails} = props.video?.snippet ||{};
    const {viewCount,likeCount,dislikeCount} = props.video?.statistics || {};

    const {snippet:channelSnippet,statistics:channelStatistics} = useSelector(state=>state.channelDetails.channel);
    const {subscriptionStatus} = useSelector(state=>state.channelDetails);
    
    
    console.log("channelSnippet",channelSnippet,"statistics",channelStatistics)
    useEffect(()=>{
        if(channelId){
            dispatch(getChannelDetails(channelId));
            dispatch(checkSubscriptionStatus(channelId));
        }
    },[channelId]);

  return (
    <div className='videoMetaData py-2'>
        <div className='videoMetaData__top'>
            <h5>{title}</h5>
            <div className='d-flex justify-content-between align-item-center py-1'>
                <span className='d-flex gap-2'>
                    <span>
                        {numeral(viewCount).format('0.a')} Views
                    </span>
                    <span> • </span>
                    <span>
                    {moment(publishedAt).fromNow()}
                    </span>
                </span>

                <div className='d-flex'>
                    <span className='mx-3 d-flex gap-2'>
                        <MdThumbUp size={26}/>{numeral(likeCount).format('0.a')}
                    </span>
                    <span className='mr-3 d-flex gap-2'>
                        <MdThumbDown size={26}/>{numeral(dislikeCount).format('0.a')}
                    </span>
                </div>
            </div>
        </div>
        <div className='videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3'>
            <div className='d-flex align-items-center'>
                <img
                src={channelSnippet?.thumbnails?.medium?.url}
                alt=''
                className='rounded-circle mr-3'
                />
                <div className='d-flex flex-column'>
                    <span>{channelTitle}</span>
                    <span>{numeral(channelStatistics?.subscriberCount).format('0.a')} Subscribers</span>
                </div>
            </div>
            <button className={`btn border-0 p-2 m-2 ${subscriptionStatus && 'btn-gray'}`}>{subscriptionStatus ? 'Subscribed' : 'Subscribe'}</button>
        </div>
        <div className='videoMetaData__description'>
          <ShowMoreText 
            lines={3} 
            more='SHOW MORE' 
            less="SHOW LESS"
            anchorClass='showMoreText'
            expanded={false}
          >
            {description}
          </ShowMoreText>
        </div>
    </div>
  )
}

VideoMetaData.defaultProps = {
    video:{snippet:{
        channelId:'', 
        channelTitle:'',
        description:'', 
        title:'',
        publishedAt:'', 
        thumbnails:{}
    },statistics:{}},
    videoId:''
};

export default VideoMetaData
