import React, { useEffect, useState } from 'react'
import {Container} from 'react-bootstrap';
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import HomeScreen from './screens/homeScreen/HomeScreen';
import "./_app.scss";
import LoginScreen from './screens/loginScreen/LoginScreen';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/searchScreen/SearchScreen';
import SubscriptionScreen from './screens/subscriptionsScreen/SubscriptionScreen';
import ChannelScreen from './screens/channelScreen/ChannelScreen';


const Layout = ({children}) => {
  const [sidebar,toggleSidebar] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar(!sidebar);
  };

  return (
  <>
    <Header handleToggleSidebar={handleToggleSidebar} />
    <div className='app__container'>
    <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar}/>
    
    <Container fluid className='app__main'>
        {children}
    </Container>
      </div>
  </>
  )
};

const App = () => {
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);

  useEffect(()=>{
    if(!auth.loading && !auth.accessToken){
      navigate('/auth');
    }
  },[auth]);

  return (
      <Routes>
      <Route exact path='/' element={<HomePage/>} />
      <Route path='/auth' element={<LoginScreen/>} />
      <Route path='/search/:query' element={<SearchMe/>}/>
      <Route path='/watch/:id' element={<WatchPage/>}/>
      <Route path='/feed/subscriptions' element={<SubscriptionPage/>}/>
      <Route path='/channel/:channelId' element={<ChannelPage/>}/>
      <Route path='*' element={<NotFound/>}/>
      </Routes>
  )
};
function ChannelPage(){
  return (
    <Layout>
      <ChannelScreen/>
    </Layout>
  )
}

function SubscriptionPage(){
  return (
    <Layout>
      <SubscriptionScreen/>
    </Layout>
  )
}
function WatchPage(){
  return (
    <Layout>
        <WatchScreen/>
    </Layout>
  )
};

function SearchMe(){
  return(
    <Layout>
    <SearchScreen/>
  </Layout>
  )
};

function HomePage(){
  return (
    <Layout>
        <HomeScreen/>
    </Layout>
  )
};

function NotFound() {
  return <h1 style={{color:'#fff'}}>404 - Page not found</h1>;
};

export default App
