import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import VideoMetaData from '../../components/videoMetaData/VideoMetaData'
import Comments from '../../components/comments/Comments'
import VideoHorizonal from '../../components/videoHorizontal/VideoHorizonal'
import './_watchScreen.scss';
import { useParams } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getRelatedVideo, getVideoDetailById } from '../../redux/actions/videos.action'
import SkeltonHorizontalVideo from '../../components/skelton/SkeltonHorizontal'


const WatchScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {video,loading} = useSelector(state=>state.selectedVideo);
    const {video:relatedVideo,loading:relatedVideoLoading} = useSelector(state=>state.relatedVideo);

    useEffect(()=>{
        if(id){
        dispatch(getVideoDetailById(id));
        dispatch(getRelatedVideo(id));
        }
    },[id])
  return (
    <Row>
        <Col lg={8}>
            <div className='watchScreen__player'>
                <iframe 
                src={`https://www.youtube.com/embed/${id}`} 
                frameBorder='0'
                title={video?.snippet?.title}
                allowFullScreen
                width={'100%'}
                height={'100%'}
                />
            </div>
            {(!loading && id)? <VideoMetaData video={video} videoId={id} /> : <h2>Loading...</h2>}
            <Comments videoId={id}/>
        </Col>
        <Col lg={4}>
            {!relatedVideoLoading ? relatedVideo?.filter(video=>video.snippet)?.map((items)=>(
                <VideoHorizonal video={items} key={items?.id?.videoId}/>
            )) : [...Array(15)].map(()=>(<SkeltonHorizontalVideo />))}
        </Col>
    </Row>
  )
}

export default WatchScreen
