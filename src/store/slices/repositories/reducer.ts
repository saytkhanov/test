import { createReducer } from '@reduxjs/toolkit';

interface Repository {
  id: number;
  name: string;
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

const repositoriesReducer = createReducer(initialState, (builder) => {
  builder

});

export default repositoriesReducer;
