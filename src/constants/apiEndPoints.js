export const BACKEND_URL = 'http://localhost:4000/';
export const BACKEND_URL_AUTH = 'http://localhost:8000/auth/';
//TODO:Change Backend URL

export const REGISTER = {
  url:'/user',
  method:'post'
};

export const LOGIN  = {
  url:'/login',
  method:'post'
};

export const GET_TYPE_DATA  = {
  url:'/type/all',
  method:'get'
};

export const GET_TYPE_DATA_BY_NAME  = (name) => {
  return {
    url:`/type/${name}`,
    method:'get'
  };
};

export const POST_TYPE = {
  url:'/type',
  method:'post'
};

export const PUT_FIELD_BY_TYPENAME = (name) => {
  return {
    url:`/type/${name}`,
    method:'put'
  };
};

export const PUT_EDIT_FIELD_BY_TYPENAME = (name) => {
  return {
    url:`/type/editField/${name}`,
    method:'put'
  };
};

export const DELETE_FIELD_BY_TYPENAME = (name) => {
  return {
    url:`/type/${name}`,
    method:'delete'
  };
};

export const GET_ENTRIES_DATA_BY_TYPE  = (id) => {
  return {
    url:`/entity/${id}`,
    method:'get'
  };
};

export const DELETE_ENTRIES_DATA_BY_ID  = (id) => {
  return {
    url:`/entity/${id}`,
    method:'delete'
  };
};

export const POST_ENTRIES_DATA_BY_TYPE  = (id) => {
  return {
    url:`/entity/${id}`,
    method:'post'
  };
};

export const UPDATE_ENTRIES_DATA_BY_TYPE  = (id) => {
  return {
    url:`/entity/${id}`,
    method:'patch'
  };
};

