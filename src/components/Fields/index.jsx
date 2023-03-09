/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Fields.css';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { GET_TYPE_DATA_BY_NAME } from '../../constants/apiEndPoints';

export const Fields = ({fieldName}) => {

  const [fieldData, setFieldData] = useState({
    fields:[]
  });

  useEffect(() => {
    makeRequest(GET_TYPE_DATA_BY_NAME(fieldName),{
      headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdHZpa0BnbWFpbC5jb20iLCJpYXQiOjE2NzgzNzk2MTYsImV4cCI6MTY3ODU1MjQxNn0.DZQULkCxlCnZVPmT8dAkBc6f0p08YNzRpaoEqOnuyaE' }
    })
      .then((response) => {
        console.log(response.fields);
        setFieldData(response);
      });
  }, [fieldName]);

  return (
    <div className='fields-main'>
      <div className='fields-heading' >
        <a id='fields-heading'>{fieldData.typeName}</a>
        <a>13 Fields</a>
      </div>
      <button id="add-field-btn">Add another field</button>
      <div className='fields-content'>
        { fieldData.fields.map(item=>{
          return (
            <div key={item} className="fields-list">
              <a>{item}</a>
              <a>string</a>
              <div className="edit-options">
                <img src={require('../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png')} alt="" />
                <img src={require('../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png')} alt="" />
              </div>
            </div>
          );
        })
        } 
       
      </div>
            
    </div>
  );
    
};

Fields.propTypes = {
  fieldName: PropTypes.string.isRequired
};

