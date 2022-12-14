import { combineReducers } from 'redux';
import * as loginReducer from './login-reducer/login-reducer';

export interface State {
    loginReducer: loginReducer.State;
}

export const initialState: State = {
    loginReducer: loginReducer.initialState,
}

const reducer = {
   loginReducer: loginReducer.reducer,
};

const rootReducer = combineReducers(reducer);

export default rootReducer;
