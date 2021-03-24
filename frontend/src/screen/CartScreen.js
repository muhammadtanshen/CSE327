import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import{useDispatch,useSelector} from 'react-redux';
import {Row,Col,Image,ListGroup,Form,Button,Card} from 'react-bootstrap';
import Loader from '../components/Loader';
import {fetchCart} from '../actions/index';

const CartScreen = ({match,location,history})=>{
    const productId  = match.params.id;
    console.log(productId);
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    console.log(qty);
    const dispatch  = useDispatch();
    useEffect(()=>{
        if(productId){
            dispatch(fetchCart(productId,qty))
        }
    },[dispatch,productId,qty])
    
    return(<div>
        Cart😎
    </div>)
}
export default CartScreen;