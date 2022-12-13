import ActionWithPayload from '../utils';
import { USER_NAME, USER_ID, USER_LIST } from './constants';
import { User } from '../../localStorage/localStorage-utils';

export interface State {
    users: User[];
    userName: string;
    userId: string;
}

export const initialState: State = {
    users: [],
    userName: '',
    userId: '',
};

export function reducer(state = initialState, action: ActionWithPayload): State {
    let newState;
    switch (action.type) {
        case USER_NAME:
            newState = {
                ...state,
                userName: action.payload,
            };
            return newState;
        case USER_ID:
            newState = {
                ...state,
                userId: action.payload,
            };
            return newState;
        case USER_LIST:
            return {
                ...state,
                users: action.payload,
            };
    
        default:
            console.log('reducer: default');
            return {...state};
    }
}
