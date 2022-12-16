
import loginReducer, {State as loginState } from './login-reducer/login-slice';

export interface State {
    loginReducer: loginState;
}

export const reducer = {
   loginReducer: loginReducer,
};
