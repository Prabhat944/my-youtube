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

const Sidebar = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    props.handleToggleSidebar();
    dispatch(logout());
  };
  return (
    <nav className={`sidebar ${props.sidebar && 'open'}`}>
      <li onClick={props.handleToggleSidebar}>
        <MdHome size={23} />
        <span>Home</span>
      </li>
      <li onClick={props.handleToggleSidebar}>
        <MdSubscriptions size={23} />
        <span>Subscriptions</span>
      </li>
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
      <li onClick={logoutHandler}>
        <MdExitToApp size={23} />
        <span>Log Out</span>
      </li>
      <hr />
    </nav>
  )
}

export default Sidebar
