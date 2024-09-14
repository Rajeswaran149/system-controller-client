import axios from 'axios';
import { base_url } from '../config';

   export const fetchElectricians = () => async dispatch => {
     const response = await axios.get(`${base_url}/api/electricians`);
     console.log(response)
     dispatch({ type: 'FETCH_ELECTRICIANS', payload: response.data });
   };

   export const fetchComplaints = () => async dispatch => {
     const response = await axios.get(`${base_url}/api/complaints`);
     dispatch({ type: 'FETCH_COMPLAINTS', payload: response.data });
   };