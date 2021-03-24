import {PRODUCT_LIST_FAIL,PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_SUCCESS} from '../components/constants/productConstants';
import {CART_ADD_ITEM} from '../components/constants/cartConstant';
import axios from 'axios';
export const fetchAllProduct = ()=>{
    return async(dispatch,setState)=>{
        try{
            dispatch({type:PRODUCT_LIST_REQUEST});
            const {data} = await axios.get('http://localhost:3000/api/products');
            dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
        }catch(error){
            dispatch({
                type:PRODUCT_LIST_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}


export const fetchSingleProduct = (id)=>{
    return async (dispatch,setState)=>{
        //const product = await axios.get();
        try{
            dispatch({type:PRODUCT_DETAIL_REQUEST});
            const response = await axios.get(`/api/products/${id}`);
            dispatch({type:PRODUCT_DETAIL_SUCCESS,payload:response.data});
        }catch(error){
            dispatch({
                type:PRODUCT_DETAIL_FAIL,
                payload:error.response && error.response.data.message ? error.response.data.message : error.message
            })
        }
    }
}


export const fetchCart = (id,qty)=>{
    return async(dispatch,getState)=>{
        const {data} = await  axios.get(`/api/products/${id}`);
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                productId:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                qty
            }
        });
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    }
}