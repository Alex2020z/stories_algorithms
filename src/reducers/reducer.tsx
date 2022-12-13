import { combineReducers } from 'redux';
import * as loginReducer from './login-reducer/login-reducer';
import userReducer from './login-reducer/login-slice';
import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';

export const initialState: State = {
    loginReducer: loginReducer.initialState,
}

export interface State {
    loginReducer: loginReducer.State;
}

export const rootReducer = {
   loginReducer: loginReducer.reducer,
};

export const createRootReducer = combineReducers<State>(rootReducer);

export default createStore(createRootReducer, initialState);

// export default configureStore({
//     reducer: {
//       users: userReducer,
//     },
//   })
