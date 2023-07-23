import React, { useEffect, useState } from 'react';
import "./_header.scss";
import {FaBars} from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai';
import {MdNotifications, MdApps} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SEARCHED_VIDEO_SUCCESS } from '../../redux/actionTypes';


const Header = (props) => {
  const navigate = useNavigate();
  const dispatch =useDispatch();
  const {user} = useSelector(state=>state.auth);
  const {keyword} = useSelector(state=>state.searchVideos);
  const [searchInput,setSearchInput] = useState('');

  const inputHandler = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    
    if(searchInput.trim() === '')return;
    dispatch({
      type:SEARCHED_VIDEO_SUCCESS,
      payload:{
          video:[],
          nextPageToken:'',
          keyword:searchInput
      }
  });
     navigate(`/search/${searchInput}`);
  };

  useEffect(()=>{
    if(keyword){
      setSearchInput(keyword);
    }
  },[keyword]);

  return (
    <div className='header' >
     <FaBars className='header__menu' size={26} onClick={props.handleToggleSidebar}/>
     <span className='d-flex align-items-center header__myLogo'>
     <img src='https://pngimg.com/uploads/youtube/small/youtube_PNG12.png' alt='' className='header__logo' />
     <h4>My-Youtube</h4>
     </span>
     <form onSubmit={searchHandler}>
      <input type='text' placeholder='Search' value={searchInput} onChange={inputHandler}/>
      <button type='submit'>
        <AiOutlineSearch size={22}/>
      </button>
     </form>

     <div className='header__icons'>
      <MdNotifications size={28}/>
      <MdApps size={28}/>
      <img src={user?.photoURL} alt='avatar' crossOrigin='anonymous' />
     </div>
    </div>
  )
}

export default Header
