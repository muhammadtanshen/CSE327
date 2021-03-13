import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import './index.css';
import {Provider} from 'react-redux';
// import {applyMiddleware, createStore,compose} from 'redux';
import store from './store';
// import thunk from 'redux-thunk';
// import reducers from './reducers/index';
import App from './App';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducers,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Provider store={store}>
<App/>
</Provider>
,document.querySelector('#root'));