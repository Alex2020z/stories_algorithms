import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
        setUserName(state, action) {
	        return {
		        ...state,
		        userName: action.payload,
		    }
        },
        setUserId(state, action) {
	        return {
		        ...state,
		        userId: action.payload,
		    }
        },

        setUserList(state, action) {
	        return {
		        ...state,
		        users: action.payload,
		    }
        },
    }
});

export const {
    setUserName,
    setUserId,
    setUserList,
  } = userSlice.actions
  
export default userSlice.reducer;
