/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Fields } from '../Fields';
import './ContentType.css';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { POST_TYPE } from '../../constants/apiEndPoints';

export const ContentType = ({typeData}) => {

  const [fieldName, setFieldName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [newType, setNewType] = useState('');

  const handleClick = (name) => {
    
    console.log(name);
    setFieldName(name);
  };

  const handleAddType = () => {
    setIsOpen(true);
  };

  const handleAddTypeButton = () => {
    if(newType === ''){
      setIsOpen(false);  
      return;
    }

    makeRequest(POST_TYPE,{
      headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdHZpa0BnbWFpbC5jb20iLCJpYXQiOjE2NzgzNzk2MTYsImV4cCI6MTY3ODU1MjQxNn0.DZQULkCxlCnZVPmT8dAkBc6f0p08YNzRpaoEqOnuyaE' },
      data: { typeName: newType }
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
    
    setIsOpen(false);
  };

  const handleNewTypeInput = (e) => {
    setNewType(e.target.value);
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
          <button onClick={handleAddType} id="new-btn" >+New Type</button>
          { isOpen &&<div className="add-type-container">
            <label >Enter new type</label>
            <input onChange={handleNewTypeInput} type="text" />
            <button onClick={handleAddTypeButton}>Save</button>
          </div>
          }
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
          { fieldName.length>0 && <Fields fieldName={fieldName} setFieldName= {setFieldName} /> }  
        </div>
      </div>


    </div>
  );
};

ContentType.propTypes = {
  typeData: PropTypes.arrayOf(PropTypes.object).isRequired,
};