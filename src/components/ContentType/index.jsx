/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Fields } from '../Fields';
import './ContentType.css';
import PropTypes from 'prop-types';

export const ContentType = ({typeData}) => {

  const [fieldName, setFieldName] = useState('');

  const handleClick = (name) => {
    
    console.log(name);
    setFieldName(name);
  };

  return (
    <div className='content-main'>
      <div className='content-header'>
        <a id='content-heading'>Content Types</a>
      </div>
      <div className='content-body'>
        <div className="body-left">
          <div className="body-left-header">
            <a id='body-left-heading'>{typeData.length} Types</a>
            <img id="search-img" src={require('../../assets/icon-search-dark_2023-03-09/icon-search-dark.png')} alt="" />
          </div>
          <button id="new-btn" >+New Type</button>
          {/* <div className="body-left-content">
            <ul className='left-list'> */}
          {typeData.map(item=>{
            return <div onClick={()=>handleClick(item.typeName)} id="list-content" key={item.id} ><a name={item.typeName}>{item.typeName}</a><a>13</a></div>;
          }
          )}
          {/* <div id="list-content">  
            <a id="">company_profile</a>
            <a>13</a>
          </div>
          <div id="list-content">  
            <a id="">company_profile</a>
            <a>13</a>
          </div>
          <div id="list-content">  
            <a id="">company_profile</a>
            <a>13</a>
          </div>
          <div id="list-content">  
            <a id="">company_profile</a>
            <a>13</a>
          </div> */}
          {/* </ul>
          </div> */}

        </div>    
        <div className="body-right">
          { fieldName.length>0 && <Fields fieldName={fieldName} /> }  
        </div>
      </div>

    </div>
  );
};

ContentType.propTypes = {
  typeData: PropTypes.arrayOf(PropTypes.object).isRequired,
};