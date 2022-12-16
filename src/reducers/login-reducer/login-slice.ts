import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../localStorage/localStorage-utils';

export interface State {
    users: User[];
    connectedUserName: string;
    connectedUserId: string;
    isLoading: boolean;
}


const initialState: State = {
    users: [],
    connectedUserName: '',
    connectedUserId: '',
    isLoading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setConnectedUserName(state, action) {
	        return {
		        ...state,
		        connectedUserName: action.payload,
		    }
        },
        setConnectedUserId(state, action) {
	        return {
		        ...state,
		        connectedUserId: action.payload,
		    }
        },
        setUserList(state, action) {
	        return {
		        ...state,
		        users: action.payload,
		    }
        },
        setIsLoading(state, action) {
	        return {
		        ...state,
		        isLoading: action.payload,
		    }
        }
    }
});

export const {
    setConnectedUserName,
    setConnectedUserId,
    setUserList,
    setIsLoading,
  } = userSlice.actions
  
export default userSlice.reducer;

// Thunk function:
export async function thunkSetIsLoading(dispatch: any) {
    dispatch({ type: 'user/setIsLoading', payload: true });
    console.log('t1=', new Date().getTime());

    setTimeout(() => {
        console.log('t2=', new Date().getTime());
        dispatch({ type: 'user/setIsLoading', payload: false })
    }, 1000);
}

