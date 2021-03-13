/*
  SOJUZ EVENTS API
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { w } from '~/plugins/soyuz-walker';

const MOCKUPMODE = true;

export const runEvent = (event, URLQuery) => {
  return event.method == 'READ' ? eventREAD(event, URLQuery) : eventWRITE(event, URLQuery);
};
const eventREAD = (event, URLQuery) => {
  let output;
  /* 
    MOCKUPMODE update store from localStorage if exist
  */
  if (MOCKUPMODE) {
    try {

    /* 
      1. load data from localstorage
    */
      const localData = JSON.parse(window.localStorage.getItem(`sojuz_${event.slug}`));
    /* 
      2. and save from observable store 
    */
      S.set({ source: event.slug, value: localData });
    /* 
      3. now prepare query_variables to filters responce data
    */
      const filters_qv = w(event.query_variables, '', URLQuery)
    /* 
      4. and get storage data and filter to responce
    */
      output = S.get({ source: event.slug, query_variables: filters_qv });


    } catch (error) {}
   

    return output;
  } else {
    // RUN RESOLVER
    // default GQL query
  }
};
const eventWRITE = (event) => {
  console.log('WRITE');
};

/* 
  HELPERS 
*/


