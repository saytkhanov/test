import { createReducer } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  token: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  username: '',
  token: '',
  status: 'idle',
  error: null
};

const userReducer = createReducer(initialState, (builder) => {
  builder
});

export default userReducer;
