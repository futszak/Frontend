/*
  SOJUZ OBSERVABLE STORAGE
*/

import Vue from 'vue';
import { g_p_v, s_p_v } from '~/plugins/soyuz-walker';
export const store = Vue.observable({});

/*
  API METHODS
*/
const _p = 'sojuz_';
/* sGet */
export const S = {
  get(attrs) {
    /* 
      sanit key to check is exist 
    */
    const storeKey = attrs.source.split('.')[0];
    /* 
      and get value as output variable 
    */
    let output = store[`${_p}${storeKey}`] ? g_p_v(store, `${_p}${attrs.source}`) : null;
    /* 
      now can process output data by event filters
      ...
    */

    /* 
      and if see query_variables then finaly filter responce 
    */
    attrs.query_variables && Object.keys(attrs.query_variables)
      ? (output = query_filters(output, attrs.query_variables))
      : null;
    /* 
      ;)
    */
    return output;
  },
  set(attrs) {
    return s_p_v(store, attrs.value, `${_p}${attrs.source}`);
  },
};
Vue.prototype.$store = store;


/* Responce filter  */
export const query_filters = (d, f) => {
  if (f && Array.isArray(d)) {
    return d.filter(function(e) {
      return Object.keys(f).every(function(a) {
        return !!Object.values(f).find((elem) => elem == e[a]);
      });
    });
  }
  return d;
};