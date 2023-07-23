import React from 'react';
import "./_sidebar.scss";
import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/auth.action';
import { Link, useNavigate } from 'react-router-dom';
import { SEARCHED_UPDATE_KEYWORD } from '../../redux/actionTypes';

const Sidebar = (props) => {
  const dispatch = useDispatch();

  const homeHandler  = () =>{
    dispatch({
      type:SEARCHED_UPDATE_KEYWORD,
      payload:''
    });
    props.handleToggleSidebar();
  };

  const subscriptionHandler = () =>{
    props.handleToggleSidebar();
  };

  const logoutHandler = () => {
    props.handleToggleSidebar();
    dispatch(logout());
  };


  return (
    <nav className={`sidebar ${props.sidebar && 'open'}`}>
      <Link to='/'>
      <li onClick={homeHandler}>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      </Link>
      <Link to='/feed/subscriptions'>
      <li onClick={subscriptionHandler}>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
      </Link>
      <li onClick={props.handleToggleSidebar}>
        <MdThumbUp size={23} />
        <span>Likes</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdHistory size={23} />
        <span>History</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdLibraryBooks size={23} />
        <span>Library</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdSentimentDissatisfied size={23} />
        <span>I don't know</span>
      </li>
      <hr />
      <h5>Explore</h5>
      <li onClick={props.handleToggleSidebar}>
        <MdThumbUp size={23} />
        <span>Trending</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdHistory size={23} />
        <span>Shopping</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdLibraryBooks size={23} />
        <span>Music</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdSentimentDissatisfied size={23} />
        <span>Movies</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdThumbUp size={23} />
        <span>Live</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdHistory size={23} />
        <span>Gaming</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdLibraryBooks size={23} />
        <span>News</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdSentimentDissatisfied size={23} />
        <span>Sports</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdSentimentDissatisfied size={23} />
        <span>Learning</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdSentimentDissatisfied size={23} />
        <span>Fashion & Beauty</span>
      </li>
      <hr />
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  )
}

export default Sidebar
