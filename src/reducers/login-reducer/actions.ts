import ActionWithPayload from '../utils';
import { USER_NAME, USER_ID, USER_LIST } from './constants';
import { User } from '../../localStorage/localStorage-utils';


export const setUserName = (userName: string): ActionWithPayload => {
    const res: ActionWithPayload = {
        type: USER_NAME,
        payload: userName,
    };
    return res;
};

export const setUserId = (userId: string): ActionWithPayload => ({
    type: USER_ID,
    payload: userId,
});

export const setUserList = (userList: User[]): ActionWithPayload => ({
        type: USER_LIST,
    payload: userList,
});

