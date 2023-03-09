/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { GET_TYPE_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { ContentType } from '../ContentType';
import './Sidebar.css';

export const Sidebar = () => {
    
  const [typeData,setTypeData] = useState([]);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    makeRequest(GET_TYPE_DATA,{
      headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdHZpa0BnbWFpbC5jb20iLCJpYXQiOjE2NzgzNzk2MTYsImV4cCI6MTY3ODU1MjQxNn0.DZQULkCxlCnZVPmT8dAkBc6f0p08YNzRpaoEqOnuyaE' }
    })
      .then((response) => {
        console.log(response);
        setTypeData(response);
      });
  }, []);

  return (
    <div className="super">
      <div className="sidebar-main">
        <div className="sidebar-header">
          <a id="sidebar-heading">CMS+</a>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-header-text">
            <a><b>COLLECTION TYPES</b></a>
            <img id="search-img" src={require('../../assets/icon-search-dark_2023-03-09/icon-search-dark.png')} alt="" />
          </div>    
          <div className="content">
            <ul className='content'>
              {typeData.map(item=>{
                return <li key={item.id} id="sidebar-list">{item.typeName}</li>;
              })
              }
            </ul>
          </div>
          <div className="">
            <a><b>CONTENT TYPES</b></a>
          </div> 
        </div>
        
      </div>
      <ContentType typeData={typeData}/>
    </div>
  );
};
