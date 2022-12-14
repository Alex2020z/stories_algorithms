import userReducer from './login-reducer/login-slice';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { initialState }  from './reducer';
import { createStore } from 'redux';

const store = createStore(rootReducer, initialState);

// const store = configureStore({
//     reducer: {
//       users: userReducer,
//     },
//   })

export default store;
