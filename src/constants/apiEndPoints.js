export const BACKEND_URL = 'http://localhost:8000/api/';
//TODO:Change Backend URL

export const GET_EVENTS_DATA = {
  url:'events',
  method:'get'
};

export const GET_EVENT_BY_ID = (id) => ({
  url:`events/${id}`,
  method:'get'
});

export const UPDATE_EVENT_BOOKMARK_BY_ID = (id) => ({
  url:`events/${id}`,
  method:'patch'
});