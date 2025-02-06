import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

export const registerUser = createAsyncThunk('/auth/register',

    async (FormData) => {
        const Response = await axios.post('http://localhost:5000/api/auth/register', FormData, {
            withCredentials: true
        })
        return Response.data;
    }
)

export const loginUser = createAsyncThunk('/auth/login',

    async (FormData) => {
        const Response = await axios.post('http://localhost:5000/api/auth/login', FormData, {
            withCredentials: true
        })
        return Response.data;
    }
)

export const checkauth = createAsyncThunk('/auth/checkauth',

    async () => {
        const Response = await axios.get('http://localhost:5000/api/auth/check-auth', {
            withCredentials: true,
            headers: {
                'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
                Expires: '0'
            }
        })
        return Response.data;
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = true;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = true;
            state.user = null;
            state.isAuthenticated = false
        }).addCase(checkauth.pending, (state) => {
            state.isLoading = true
        }).addCase(checkauth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.success ? action.payload.user : null;
            state.isAuthenticated = action.payload.success
        }).addCase(checkauth.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
    },
})


export const { setUser } = authSlice.actions
export default authSlice.reducer