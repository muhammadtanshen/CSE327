import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools}   from 'redux-devtools-extension';
import {productListReducer} from './reducers/productList';
import {productReducer} from './reducers/productReducer';
import {cartReducer} from './reducers/cartReducer';

const reducer = combineReducers({
    productList:productListReducer,
    singleProduct:productReducer,
    cart:cartReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const initalState = {
    cart:{cartItems:cartItemsFromStorage}
};


const middlewares = [thunk];

const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middlewares)));


export default store;