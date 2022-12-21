import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
    name: 'app',
    initialState: {
        loading: false,
        errors: []
    },
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setErrors(state, action) {
            state.errors = [...state.errors, action.payload];
        },
        clearErrors(state, action) {
            state.errors = [];
        },
    },
});

export default auth.reducer;

export const appActions = auth.actions;
