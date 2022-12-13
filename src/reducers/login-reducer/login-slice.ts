//https://codesandbox.io/s/redux-essentials-example-h1ddh?file=/src/features/posts/postsSlice.js

//https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux
//https://redux.js.org/introduction/why-rtk-is-redux-today

//https://codesandbox.io/s/redux-essentials-example-h1ddh?file=/src/features/posts/postsSlice.js
//https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers
//https://redux.js.org/tutorials/fundamentals/part-8-modern-redux
//https://redux.js.org/introduction/why-rtk-is-redux-today

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import ActionWithPayload from '../utils';
//import { USER_NAME, USER_ID, USER_LIST } from './constants';
import { User } from '../../localStorage/localStorage-utils';

  export interface State {
    users: User[];
    userName: string;
    userId: string;
}

const initialState: State = {
    users: [],
    userName: '',
    userId: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userName(state, action) {
            state.userName = action.payload;
        },
        userId(state, action) {
           state.userId = action.payload;
        },
        userList(state, action) {
            state.users = action.payload;
        },
    }
});

export const {
    userName,
    userId,
    userList,
  } = userSlice.actions
  
export default userSlice.reducer;
