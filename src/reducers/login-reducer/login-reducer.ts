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
    switch (action.type) {
        case USER_NAME:
            return {
                ...state,
                userName: action.payload,
            };
        case USER_ID:
            return {
                ...state,
                userId: action.payload,
            };
        case USER_LIST:
            return {
                ...state,
                users: action.payload,
            };
    
        default:
            return {...state};
    }
}
