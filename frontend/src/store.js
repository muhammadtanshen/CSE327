import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools}   from 'redux-devtools-extension';
import {productListReducer} from './reducers/productList';

const reducer = combineReducers({
    productList:productListReducer
});

const initalState = {};

const middlewares = [thunk];

const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middlewares)));


export default store;