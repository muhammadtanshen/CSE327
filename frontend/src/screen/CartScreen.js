import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Loader from "../components/Loader";
import CartMessage from "../components/CartMessage";
import { fetchCart,deleteCartItem } from "../actions/index";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  //console.log(productId);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  //console.log(qty);
  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    //console.log(state);
    return state.cart;
  });
  const { cartItems } = cart;
  //console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(fetchCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCart = (id) => {
    dispatch(deleteCartItem(id));
  };

  const checkoutHandler = ()=>{
    history.push('/login?redirect=shipping');
  }

  return (
    <div>
      <Row>
        <Col md={8}>
          <h1>Shooping Cart</h1>
          {cartItems.length === 0 ? (
            <CartMessage>
              <Link to="/">Go Back</Link>
            </CartMessage>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.productId}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={
                          (e) =>
                            dispatch(
                              fetchCart(item.productId, Number(e.target.value))
                            )
                          //dispatch()
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((option) => (
                          <option key={option + 1} value={option + 1}>
                            {option + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={(e) => {
                          removeFromCart(item.productId);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                SubTotal(
                {cartItems.reduce(
                  (accumolatr, item) => accumolatr + item.qty,
                  0
                )}
                )
              </h2>
              ${cartItems.reduce((accumolatr,item)=>accumolatr + item.qty*item.price,0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Procceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );
};
export default CartScreen;
