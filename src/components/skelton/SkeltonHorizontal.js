import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';

const SkeltonHorizontalVideo = ({searchScreen}) => {
  return (
    <div style={{display:'flex',width:'100%',margin:'1rem 0',gap:'1rem'}}>
      <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
        <div style={{flex:searchScreen? 1 : 0.5,maxWidth:searchScreen? '33%' :'160px'}}>
        <Skeleton height={searchScreen? 200 : 130} width={'100%'}/>
        </div>
        <div style={{flex:searchScreen? 1 :0.5,display:'flex',flexDirection:'column',gap:'0.5rem',justifyContent:'center'}}>
            <Skeleton width={searchScreen?'40%':'90%'} height={30} />
            {searchScreen && <Skeleton width={'70%'} height={20}  />}
            <Skeleton width={'90%'} height={20}  />
            <span className='d-flex gap-2 align-items-center'>
             <Skeleton width={40} height={40}  circle={true} />
             <Skeleton width={100} height={20}  />
            </span>
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default SkeltonHorizontalVideo
