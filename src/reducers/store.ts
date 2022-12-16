import userReducer from './login-reducer/login-slice';
import { configureStore } from '@reduxjs/toolkit';
import { reducer }  from './reducer';

// const store = configureStore({
//     reducer: {
//       users: userReducer,
//     },
//   })

const store = configureStore({
    reducer: reducer,
  })


export default store;
