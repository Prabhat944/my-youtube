import React, { useEffect } from 'react'
import './_loginScreen.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth.action';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);

  
  const handleLogin = () => {
    dispatch(login());
  };

  useEffect(()=>{
    if(auth.accessToken){
      navigate('/')
    }
  },[auth])
  return (
    <div className='login'>
      <div className='login__container'>
        <img src='https://pngimg.com/uploads/youtube/small/youtube_PNG12.png' alt=''/>
        <button onClick={handleLogin}>
            Login with google
        </button>
        <span>This project is made using Youtube data api</span>
      </div>
    </div>
  )
}

export default LoginScreen
