import * as loginReducer from './login-reducer/login-reducer';
//import userReducer from './login-reducer/login-slice';

export interface State {
    loginReducer: loginReducer.State;
}

export const reducer = {
   loginReducer: loginReducer.reducer,
};
