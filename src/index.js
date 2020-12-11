import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// redux related
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import UserReducer from './store/userReducer'
import DataReducer from './store/dataReducer'

const reducer = combineReducers({
  user : UserReducer,
  channels : DataReducer
})

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}> <App /> </Provider> ,
  document.getElementById('root')
);

reportWebVitals();
