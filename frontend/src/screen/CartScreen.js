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
import { fetchCart } from "../actions/index";

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
  const {cartItems} = cart;
  //console.log(cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(fetchCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCart = (id) => {
    console.log(id);
  };
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
              {cartItems.map(item => (
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
                      <Link to={`/product/${item.productId}`}></Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) =>
                          dispatch(fetchCart(item.productId, Number(e.target.value)))
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
        <Col md={2}></Col>
        <Col md={2}></Col>
      </Row>
    </div>
  );
};
export default CartScreen;
