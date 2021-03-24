import React,{useState,useEffect} from "react";
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import {useDispatch,useSelector} from 'react-redux';
import {fetchSingleProduct} from '../actions/index';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = ({match,history}) => {
  //const [product,setProduct] = useState({});
  const [qty,setQty] = useState(1);
  const dispatch = useDispatch();
  const singleProduct = useSelector(state=>state.singleProduct);
  const {loading,error,product} = singleProduct;
  useEffect(()=>{
    dispatch(fetchSingleProduct(match.params.id));
  },[]);
  
  const addToCart = ()=>{
    history.push(`/cart/${match.params.id}/?qty=${qty}`)
  }
  
  return (
    <div>
      <Link className="btn btn-light my-3" to="/">
        GO Back
      </Link>
      {loading ? <Loader/> : error ? (<Message>{error.message}</Message>) :
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col> Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col> Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.countInStock > 0 ?(<ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                    <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map(option=>
                      <option key={option+1} value={option+1}>{option+1}</option>
                    )}
                    </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>): ''}
              <ListGroup.Item>
                <Button onClick={addToCart}
                className="btn-block" type="button" disabled={product.countInStock === 0}>
                  Add to Cart
                </Button>
                
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>}
    </div>
  );
};

export default ProductScreen;
