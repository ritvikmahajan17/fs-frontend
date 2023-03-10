/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './TypeEntries.css';
import propTypes from 'prop-types';
import makeRequest from '../../utils/makeRequest/makeRequest';
import { DELETE_ENTRIES_DATA_BY_ID, GET_ENTRIES_DATA_BY_TYPE, POST_ENTRIES_DATA_BY_TYPE, UPDATE_ENTRIES_DATA_BY_TYPE } from '../../constants/apiEndPoints';
import { TOKEN } from '../../constants/accessToken';
import { isEditable } from '@testing-library/user-event/dist/utils';

export const TypeEntries = ({id,name,typeData,setTypeData}) => {
  console.log(id,'id',name,'name');
  //   console.log(typeData.fields,'typeData');
  const [entriesData,setEntriesData] = useState([]);
  const [showAddEntry,setShowAddEntry] = useState(false);
  const [showUpdateEntry,setShowUpdateEntry] = useState(false);
  const [entryId,setEntryId] = useState('');
  const [entryData,setEntryData] = useState({});
  useEffect(() => {
    makeRequest(GET_ENTRIES_DATA_BY_TYPE(id),{
      headers: { Authorization: TOKEN }
    })
      .then((response) => {
        console.log(response,'response');
        setEntriesData(response);
      });
  },[]);

  const handleEntryDelete = (id) => {
    console.log(id,'id');
    makeRequest(DELETE_ENTRIES_DATA_BY_ID(id),{
      headers: { Authorization: TOKEN }
    });
    const newEntriesData = entriesData.filter((item) => item.id !== id);
    setEntriesData(newEntriesData);
  };

  const handleUpdateEntry = (id,data) => {
    setShowUpdateEntry(!showUpdateEntry);
    setEntryId(id);
    setEntryData(data);
    console.log(id,'id',data,'data');
    setShowAddEntry(false);
  };


  const handleAddNewEntry = () => {
    setShowAddEntry(!showAddEntry);
    setShowUpdateEntry(false);
  };

  const handleAddNewEntrySubmit = (e) => {
    e.preventDefault();
    const data = {} ;

    typeData.map((item) => {
      if(item.id===id)
        return item.fields.map((it) => {
          data[it] = e.target[it].value;
        });
    });
    makeRequest(POST_ENTRIES_DATA_BY_TYPE(id),{
      headers: { Authorization: TOKEN },
      data: {...data}
    })
      .then((response) => {
        console.log(response,'response');
        setEntriesData([...entriesData,response]);
      });

    setShowAddEntry(false);
  };

  const handleUpdateNewEntrySubmit = (e) => {
    e.preventDefault();
    const data = {} ;
    typeData.map((item) => {
      if(item.id===id)
        return item.fields.map((it) => {
          data[it] = e.target[it].value;
        });
    });
    makeRequest(UPDATE_ENTRIES_DATA_BY_TYPE(entryId),{
      headers: { Authorization: TOKEN },
      data: {...data}
    })
      .then((response) => {
        console.log(response,'response');
        const index = entriesData.findIndex((item) => item.id === entryId);
        console.log(index,'index');
        console.log(entriesData[index].data,'entries[index].data');
        entriesData[index].data = data;


        setEntriesData([...entriesData]);

        setShowUpdateEntry(false);
      });
  };

    


  return (
    <div className='entries-main'>
      <div className='entries-header'>
        <a id='entries-heading'>{name}</a>
      </div>
      <div className='entries-body'>
        <div className='entries-body-header'>
          <a id='entries-body-heading'>{entriesData.length} Entries Found</a>
          <a onClick={handleAddNewEntry} id="add-entry-btn">Add a new entry</a>
        </div>
        {showAddEntry && 
        <form onSubmit={handleAddNewEntrySubmit}>
          <div className='add-entry'>
            {typeData.map((item) => {
              if(item.id===id)
                return item.fields.map((it) => {
                  return (
                    <div key={it}className='add-entry-input'>
                      <label key={it}>{it}</label>
                      <input name={it} type="text" id={it} />
                    </div>
                  );
                });
            })
            }
            <button id="add-entry-btn">Add</button>
          </div>
        </form>}
        {showUpdateEntry && 
        <form onSubmit={handleUpdateNewEntrySubmit}>
          <div className='add-entry'>
            {typeData.map((item) => {
              if(item.id===id)
                return item.fields.map((it) => {
                  return (
                    <div key={it}className='add-entry-input'>
                      <label key={it}>{it}</label>
                      <input name={it} type="text" value={entryData[it]} onChange={(e) => setEntryData({...entryData, [it]: e.target.value})}  id={it} />
                    </div>
                  );
                });
            })
            }
            <button id="add-entry-btn">Update</button>
          </div>
        </form>}
        <div className='entries-body-content'>
          <div className='entries-body-content-header'>
            {typeData.map((item) => {
              if(item.id===id)
                return item.fields.map((it) => {
                  return (
                    <a key={it}>{it}</a>
                  );
                });
            })
            }
            <a>Actions</a>
          </div>
         
          <div className='entries-body-content-body'>
            {entriesData.map((item) => {
              return (
                
                <div key={item.id} className="entries-list">
                  {
                    Object.values(item.data).map((value, index) => {
                      return (<a key={value}>{value}</a>);
                    })
                  }
                  <div className="edit-options">
                    <img onClick={()=>handleUpdateEntry(item.id,item.data)}src={require('../../assets/user-edit-text-message-note_2023-03-09/user-edit-text-message-note.png')} alt="" />
                    <img onClick={()=>handleEntryDelete(item.id)} src={require('../../assets/trash-delete-recycle-bin-bucket-waste_2023-03-09/trash-delete-recycle-bin-bucket-waste.png')} alt="" />
                  </div>
                </div>
              );
            })}
            
          </div>
        </div>
      </div>


    </div>
  );
};

TypeEntries.propTypes = {
  id: propTypes.number.isRequired,
  name: propTypes.string.isRequired,
  typeData: propTypes.array.isRequired,
  setTypeData: propTypes.func.isRequired,
};