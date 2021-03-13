import {PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS} from '../components/constants/productConstants';

import axios from 'axios';
export const fetchAllProduct = ()=>{
    return async(dispatch,setState)=>{
        try{
            dispatch({type:PRODUCT_LIST_REQUEST});
            const {data} = await axios.get('/api/products');
            dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({
                type:PRODUCT_LIST_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
        // dispatch({type:'PRODUCT_LIST_REQUEST'})
        // const response = await axios.get('/api/products');
        // dispatch({type:'ALL_PRODUCTS',payload:response.data})
    }
}