import React from 'react';
import "./_header.scss";
import {FaBars} from 'react-icons/fa';
import {AiOutlineSearch} from 'react-icons/ai';
import {MdNotifications, MdApps} from 'react-icons/md';
import { useSelector } from 'react-redux';


const Header = (props) => {
  const {photoURL} = useSelector(state=>state.auth.user);

  return (
    <div className='header' >
     <FaBars className='header__menu' size={26} onClick={props.handleToggleSidebar}/>

     <img src='https://pngimg.com/uploads/youtube/small/youtube_PNG12.png' alt='' className='header__logo' />

     <form>
      <input type='text' placeholder='Search'/>
      <button type='submit'>
        <AiOutlineSearch size={22}/>
      </button>
     </form>

     <div className='header__icons'>
      <MdNotifications size={28}/>
      <MdApps size={28}/>
      <img src={photoURL} alt='avatar' crossOrigin='anonymous' />
     </div>
    </div>
  )
}

export default Header
