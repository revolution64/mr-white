// This will can combine one or more Reducer functions and export it through Redux's combineReducer helper.
import { combineReducers } from 'redux';

import count from './counter';
import menu from './menu';
import mrWhite from './mrWhite';

// import secondCounter from './exampleReducer';

export default combineReducers({ count, menu, mrWhite });

// Example for combining multiple reducers:
// export default combineReducers({ count, secondCounter });
