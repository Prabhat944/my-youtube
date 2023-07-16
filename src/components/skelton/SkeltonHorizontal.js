import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';

const SkeltonHorizontalVideo = () => {
  return (
    <div style={{display:'flex',width:'100%',margin:'1rem 0',gap:'1rem'}}>
      <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
        <div style={{flex:0.5,maxWidth:'160px'}}>
        <Skeleton height={130} width={'100%'}/>
        </div>
        <div style={{flex:0.5,display:'flex',flexDirection:'column',gap:'0.5rem',justifyContent:'center'}}>
            <Skeleton width={'90%'} height={30} />
            <Skeleton width={'90%'} height={20}  />
            <Skeleton width={'40%'} height={20}  />
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default SkeltonHorizontalVideo
