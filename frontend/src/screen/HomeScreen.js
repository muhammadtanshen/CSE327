import React,{useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux';
import Product from '../components/Product';
import { Row, Col } from "react-bootstrap";
// import {connect} from 'react-redux';
import {fetchAllProduct} from '../actions/index';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  //const [products,setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state=> state.productList);
  const {loading,error,products} = productList;
  useEffect(()=>{
    dispatch(fetchAllProduct());
    console.log();
    //props.fetchAllProduct();
  },[dispatch]);
  
  
  return (
    <div>
      <h1>Latest Product</h1>
      {loading ? <Loader/> : error ? (<Message>{error.message}</Message>) :  <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>}
     
    </div>
  );
};




export default HomeScreen;



