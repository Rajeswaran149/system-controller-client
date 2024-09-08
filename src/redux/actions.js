import axios from 'axios';

   export const fetchElectricians = () => async dispatch => {
     const response = await axios.get('http://localhost:5000/api/electricians');
     console.log(response)
     dispatch({ type: 'FETCH_ELECTRICIANS', payload: response.data });
   };

  //  export const fetchComplaints = () => async dispatch => {
  //    const response = await axios.get('http://localhost:5000/api/complaints');
  //    dispatch({ type: 'FETCH_COMPLAINTS', payload: response.data });
  //  };