import React, { useState } from 'react'
import "./_categoriesBar.scss";
import { useDispatch } from 'react-redux';
import { getPopularVideos, getVideoByCategory } from '../../redux/actions/videos.action';

const keywords=[
  'All',
  'React js',
  'Angular js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art',
  'Guitar',
  'Songs',
  'Cricket',
  'Football',
  'Real Marid',
  'Gatsby',
  'RoadSide Coder',
  'Dark Truth'
];

const CategoriesBar = () => {
  const dispatch = useDispatch();
  const [activeElement, setActiveElement] = useState('All')

  const handleActiveElement = (value) => {
    setActiveElement(value);
    if(value === 'All'){
      dispatch(getPopularVideos());
    }else{
    dispatch(getVideoByCategory(value));
    }
  };
  return (
    <div className='categories_bar'>
      {keywords.map((value,i)=>(
        <span 
        className={activeElement === value ? 'active' : ''}
        key={value + i}
        onClick={()=>handleActiveElement(value)}
        >
          {value}
        </span>
      ))}
    </div>
  )
}

export default CategoriesBar
