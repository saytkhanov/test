import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import axios from "axios";
import {PROXY_API} from "../../../assets/constants";
import {RootState} from "../../index";

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

export const fetchToken = createAsyncThunk<{ token: string }, { code: string }>("user/fetchToken", async (data, {rejectWithValue}) => {
    try {
        const codeQuery = "?code=" + data.code;
        const response = await axios.get(PROXY_API.TOKEN + codeQuery);

        if (response.status != 200)
            rejectWithValue(response.statusText);

        const {tokenType, token: rawToken} = response.data;

        const token = [tokenType, rawToken].join(" ");

        return {token};
    } catch (e) {
        rejectWithValue(e.toString());
    }
});

export const fetchUserData = createAsyncThunk<{ login: string }>("user/fetchUserData", async (data, {
    getState,
    rejectWithValue
}) => {
    try {
        const state: RootState = getState();

        const response = await axios.get(PROXY_API.USER, {
            headers: {
                Authorization: state.user.token
            }
        });

        if (response.status !== 200)
            rejectWithValue(response.statusText);

        return {login: response.data.login}
    } catch (e) {
        rejectWithValue(e.toString());
    }
});

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchToken.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchToken.rejected, (state, {payload}) => {
            state.status = "failed";
            state.error = payload.error;
        })
        .addCase(fetchToken.fulfilled, (state, {payload}) => {
            state.token = payload.token;
        })
        .addCase(fetchUserData.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchUserData.rejected, (state, {payload}) => {
            state.status = "failed";
            state.error = payload.error;
        })
        .addCase(fetchUserData.fulfilled, (state, {payload}) => {
            state.username = payload.login;
            state.status = "succeeded";
        });
});

export const selectToken = (state: RootState) => state.user.token;

export const selectUsername = (state: RootState) => state.user.username;

export default userReducer;
