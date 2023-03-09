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