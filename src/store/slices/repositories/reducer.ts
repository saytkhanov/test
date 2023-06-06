import {createAsyncThunk, createReducer} from '@reduxjs/toolkit';
import axios from "axios";
import {PROXY_API} from "../../../assets/constants";
import {RootState} from "../../index";

interface Repository {
    id: number;
    name: string;
    stars: number;
    // add more repository properties as needed
}

interface RepositoriesState {
    repositories: Repository[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: RepositoriesState = {
    repositories: [],
    status: 'idle',
    error: null
};

export const fetchRepositories = createAsyncThunk<{ repositories: Repository[] }>("repositories/fetchRepos", async (data, {
    rejectWithValue,
    getState
}) => {
    try {
        const state: RootState = getState();

        if (!state.user.username)
            return rejectWithValue({ error: "User not authenticated" });

        const response = await axios.get(PROXY_API.REPOS + "?login=" + state.user.username, {
            headers: {
                Authorization: state.user.token
            }
        });

        if (response.status !== 200)
            return rejectWithValue({ error: response.statusText });

        const repositories = response.data;

        const mapToRepo = (rawRepo) => ({id: rawRepo.id, name: rawRepo.name, stars: rawRepo.stargazers_count});

        return ({ repositories: repositories.map(mapToRepo)});

    } catch (e) {
        return rejectWithValue({ error: e.toString()});
    }
});

const repositoriesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(fetchRepositories.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(fetchRepositories.rejected, (state, { payload }) => {
            state.status = "failed";
            state.error = payload.error;
        })
        .addCase(fetchRepositories.fulfilled, (state, {payload}) => {
            state.repositories = payload.repositories;
            state.status = "succeeded";
        });
});

export const selectRepositories = (state: RootState) => state.repositories.repositories;

export const selectRepositoriesLoader = (state: RootState) => state.repositories.status;

export const selectRepositoriesError = (state: RootState) => state.repositories.error;

export default repositoriesReducer;
