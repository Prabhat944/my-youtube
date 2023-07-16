import React, { useEffect, useState } from 'react'
import './_comments.scss';
import Comment from '../comment/Comment';
import {useDispatch, useSelector} from 'react-redux'
import { addComment, getCommentOfVideoById } from '../../redux/actions/comment.action';

const Comments = ({videoId}) => {
  const dispatch = useDispatch();
  const {photoURL} = useSelector(state=>state.auth.user);
  const {comments} = useSelector(state=>state.commentList);
  const [userComment, setUserComment] = useState('');

  const _comment = comments?.map((item)=> item?.snippet.topLevelComment?.snippet)

  const inputHandler = (e) => {
    e.preventDefault();
    setUserComment(e.target.value);

  };

    const handleComment = (e) => {
      e.preventDefault();
      if(userComment.trim() === '')return;
      dispatch(addComment(videoId,userComment))
      setUserComment("");
    };

  useEffect(()=>{
     if(videoId){
      dispatch(getCommentOfVideoById(videoId));
     }
  },[videoId])
  return (
    <div className='comments'>
      <p>1234 Comments</p>
      <div className='comments__form'>
        <img src={photoURL} alt='' className='rounded-circle mr-3' crossOrigin='anonymous' />
        <form onSubmit={handleComment} className='d-flex flex-grow-1'>
            <input
              type='text'
              placeholder='Write a comment...'
              className='flex-grow-1'
              value={userComment}
              onChange={inputHandler}/>
            <button className='border-0 p-2'>Comment</button>
        </form>
      </div>
      <div className='comments__list'>
        {_comment.map((comment,index)=>(
            <Comment key={index} comment={comment}/>
        ))}
      </div>
    </div>
  )
}

export default Comments
