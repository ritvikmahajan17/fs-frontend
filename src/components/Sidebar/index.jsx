/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { TOKEN } from '../../constants/accessToken';
import { GET_TYPE_DATA } from '../../constants/apiEndPoints';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { ContentType } from '../ContentType';
import { TypeEntries } from '../TypeEntries';
import './Sidebar.css';

export const Sidebar = () => {

  const [showContentType, setShowContentType] = useState('contentType');
  const [typeId, setTypeId] = useState(0);
  const [typeName, setTypeName] = useState('');
    
  const [typeData,setTypeData] = useState([]);
  //   const [showContent, setShowContent] = useState(true);

  const handleShowContent = () => {
    setShowContentType('contentType');
  };

  const handleEntryTypeClick = (id,name) => {
    console.log(id);
    setTypeId(id);
    setTypeName(name);
    setShowContentType('typeEntries');
  };
  // setShowContent(false);

  useEffect(() => {
    makeRequest(GET_TYPE_DATA,{
      headers: { Authorization: TOKEN }
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
                return <li key={item.id} onClick={()=>handleEntryTypeClick(item.id,item.typeName)} id="sidebar-list">{item.typeName}</li>;
              })
              }
            </ul>
          </div>
          <div className="">
            <a onClick={handleShowContent}><b>CONTENT TYPES</b></a>
          </div> 
        </div>
        
      </div>
      {showContentType==='contentType' &&
      <ContentType key={typeId}typeData={typeData} setTypeData={setTypeData}/>
      }
      {showContentType==='typeEntries' &&
      <TypeEntries key={typeId} id ={typeId} name={typeName}typeData={typeData} setTypeData={setTypeData}/>}
    </div>
  );
};
