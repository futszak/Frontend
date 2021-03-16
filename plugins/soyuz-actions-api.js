/*
  SOJUZ ACTIONS API 
  process list of events and methods (events aggregation)
*/
import { S, store } from '~/plugins/soyuz-store-api';
import { soyuzRouter } from '~/plugins/soyuz-actions-router';

const RegActions = {...soyuzRouter}
const actionsOutput = []

export const runAction = (blockAttrs) => {
  blockAttrs.actions.map((el)=>{
  	const key = Object.keys(el)[0];    
    const value = el[key]
    /*
      Launch action
    */
    const res = RegActions[key](value)
    actionsOutput.push(res);
  })
};

