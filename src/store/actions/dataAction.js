import {  GET_DATA } from '../types';
import arrData from './data.json';







export const getData = () => async dispatch => {
 console.log("call getData--");
 console.log(arrData);


   await new Promise(resolve => setTimeout(()=>resolve(true),1000));

   dispatch({
    type: GET_DATA,
    payload: [...arrData]
});

    ////////////////
  


}

export const get_Load = () => async dispatch => {
    dispatch({
        type: GET_DATA,
        payload: false
    });
}