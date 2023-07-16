import React from 'react'
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';

const SkeltonVideo = () => {
  return (
    <div style={{width:'100%',margin:'1rem 0'}}>
      <SkeletonTheme baseColor='#343a40' highlightColor='#3c4147'>
        <Skeleton height={180}/>
        <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
            <span style={{margin:'0.5rem',flex:0.2}}>
            <Skeleton circle height={40} width={40} borderRadius={5} />
            </span>
            <span style={{flex:0.75}}>
            <Skeleton style={{flex:1}} height={40}  />
            </span>
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default SkeltonVideo
