/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Fields } from '../Fields';
import './ContentType.css';
import PropTypes from 'prop-types';
import { Modal } from '../Modal';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { GET_ENTRY_NUMBER_BY_TYPE, POST_TYPE } from '../../constants/apiEndPoints';
import { TOKEN } from '../../constants/accessToken';

export const ContentType = ({typeData,setTypeData}) => {

  const [fieldName, setFieldName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [newType, setNewType] = useState('');
  const [entryNumber, setEntryNumber] = useState([{}]);


  useEffect(() => {
    makeRequest(GET_ENTRY_NUMBER_BY_TYPE,{
      headers: { Authorization: TOKEN }
    })
      .then((response) => {
        console.log(response);
        setEntryNumber(response);
      });
  },[]);
      


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
      headers: { Authorization: TOKEN },
      data: { typeName: newType }
    })
      .then((response) => {
        console.log(response);
        console.log(newType,'newType');
        // typeData.push(newType);
        setTypeData([...typeData,{typeName:newType}]);
        // window.location.reload();
      });
    
    setIsOpen(false);
  };

  const handleNewTypeInput = (e) => {
    setNewType(e.target.value);
  };

  const getEntryNumber = (typeId) => {
    const result = entryNumber.filter((entry) => entry.typeId === typeId);
    console.log(result);
    if(result.length === 0)
      return 0;
    // console.log(result[0].count);  
    return result[0].count;
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
            return <div onClick={()=>handleClick(item.typeName)} id="list-content" key={item.id} ><a name={item.typeName}>{item.typeName}</a><a>{getEntryNumber(item.id)}</a></div>;
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
  setTypeData: PropTypes.func.isRequired
};