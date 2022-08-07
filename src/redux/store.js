import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from './appReducer';

const store = createStore(appReducer, applyMiddleware(thunk));

export default store;