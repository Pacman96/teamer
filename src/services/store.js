import { createStore, applyMiddleware, combineReducers } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk';

import _assets from '../api/assets';
import _auth from '../api/auth';
import _products from '../api/products';



const reducer = combineReducers({
    auth: _auth.reducer,
    assets : _assets.reducer,
    products: _products.store.reducer,
})

const store = createStore(
    reducer,
    applyMiddleware(
        logger,
        thunk
    ),
)

export default store