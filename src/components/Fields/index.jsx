/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Fields.css';
import PropTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { DELETE_FIELD_BY_TYPENAME, GET_TYPE_DATA_BY_NAME, PUT_EDIT_FIELD_BY_TYPENAME, PUT_FIELD_BY_TYPENAME } from '../../constants/apiEndPoints';
import { TOKEN } from '../../constants/accessToken';

export const Fields = ({fieldName,setFieldName}) => {

  const [showAddField, setShowAddField] = useState(false);
  const [newField, setNewField] = useState({});
  const [showEditField, setShowEditField] = useState(false);
  const [editField, setEditField] = useState('');
  const [filterFieldData, setFilterFieldData] = useState({});

  const [fieldData, setFieldData] = useState({
    fields:[]
  });

  const handleAddField = () => {
    setShowAddField(!showAddField);
  };

  const handleAddFieldButton = () => {
    console.log('add field button clicked');
    makeRequest(PUT_FIELD_BY_TYPENAME(fieldName),{
      headers: { Authorization: TOKEN },
      data: { field:newField }
    })
      .then(response=>{
        console.log(response);
        fieldData.fields.push(newField);
        setFieldData({...fieldData});
        // setFieldName(fieldName);
        // window.location.reload();
      });
    console.log(newField);
    setShowAddField(false);
  };

  const handleNewFieldInput = (e) => {
    setNewField(e.target.value);
  };

  const handleFieldEdit = (item) => {
    console.log(item);
    setShowEditField(true);
    setEditField(item);
  };

  const handleFieldEditButton = (item) => {
    console.log(item);
    makeRequest(PUT_EDIT_FIELD_BY_TYPENAME(fieldName),{
      headers: { Authorization: TOKEN },
      data: { oldField:editField,
        newField:newField }
    })
      .then (response=>{
        fieldData.fields = fieldData.fields.filter((field)=>field!==editField);
        fieldData.fields.push(newField);
        setEditField({...fieldData});

      });
    setShowEditField(false);
  };

  const handleFieldDelete = (item) => {
    console.log(item);
    makeRequest(DELETE_FIELD_BY_TYPENAME(fieldName),{
      headers: { Authorization: TOKEN },
      data: { field:item
      }
    })
      .then (response=>{
        console.log(response);
        fieldData.fields = fieldData.fields.filter((field)=>field!==item);
        console.log(fieldData.fields);
        setFieldData({...fieldData});
        // window.location.reload();
      });


  };
  useEffect(() => {
    makeRequest(GET_TYPE_DATA_BY_NAME(fieldName),{
      headers: { Authorization: TOKEN },
    })
      .then((response) => {
        console.log(response.fields);
        setFieldData(response);
        setFilterFieldData(response);
      });
  }, [fieldName]);



  return (
    <div className='fields-main'>
      <div className='fields-heading' >
        <a id='fields-heading'>{fieldData.typeName}</a>
        <a>{fieldData.fields.length} Fields</a>
      </div>
      <button onClick={handleAddField}id="add-field-btn">Add another field</button>
      { showAddField &&<div className="add-type-container">
        <label >Enter new type</label>
        <input onChange={handleNewFieldInput} type="text" />
        <button onClick={handleAddFieldButton}>Save</button>
      </div>
      }
      { showEditField &&<div className="add-type-container">
        <label >Enter new type</label>
        <input onChange={handleNewFieldInput} type="text" />
        <button onClick={handleFieldEditButton}>Save</button>
      </div>
      }
      <div className='fields-content'>
        { fieldData.fields.map(item=>{
          return (
            <div key={item} className="fields-list">
              <a>{item}</a>
              <a>string</a>
              <div className="edit-options">
                <img onClick={()=>handleFieldEdit(item)} src={require('../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png')} alt="" />
                <img onClick={()=>handleFieldDelete(item)} src={require('../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png')} alt="" />
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
  fieldName: PropTypes.string.isRequired,
  setFieldName: PropTypes.func.isRequired,
};

