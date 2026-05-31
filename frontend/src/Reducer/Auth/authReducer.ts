import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import backendApi from "../../Api/backendApi";
import axios from 'axios';
import { toast } from 'sonner';



// reducer which holds the whole function 
interface User {
    _id: string;
    email: string;
    name?: string;//this mean optional
    token: string;
    uploadCound: number;
    downloadCount: number;

}

export interface AuthState {
    loggedInUser: User | null;
    loading: boolean
}

interface SignUpPayload {
    email: string;
    password: string;

}
interface SignInPayload {
    email: string;
    password: string;

}
interface AuthResponse {
    success: boolean,
    message: string,
    user?: User,
}

// initial mean beginning
//this is the what  the store look like when the app run first 
const initialState: AuthState = {
    loggedInUser: null,
    loading: false
}





//sign up request to the backend
export const signUpUser = createAsyncThunk<void, SignUpPayload, { rejectValue: string }>
    ('auth/sign-up-user', async (payload) => {
        try {
            const { data } = await backendApi.post<AuthResponse>("/api/v1/auth/signup", payload);
            if (data.success) {
                toast.success(data.message)

            }
            else {
                console.log("working")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message;
                toast.error(message || "Something went wrong")
            }
        }
    })


// sign in user 
export const signInUser = createAsyncThunk<
    string,
    SignInPayload,
    { rejectValue: string }

>(
    'auth/sign-in-user', async (payload, thunkApi) => {
        try {
            const { email, password } = payload;
            const { data } = await backendApi.post<AuthResponse>("/api/v1/auth/signin",
                { email, password }
            );
            if (data.success && data.user?.token) {
                if (data.user) {
                    toast.success(data.message);
                }
                return data.user.token;

                // todo display user page 

            }
            else {
                toast.warning(data.message);
                return thunkApi.rejectWithValue(data.message)
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message;
                toast.error(message || "Something went wrong");
                return thunkApi.rejectWithValue(message || "Something went wrong");
            }
            return thunkApi.rejectWithValue("Something went wrong");
        }
    }
)


// data Fetching for userprofile 
// we have write the void  because we are not getting any payload from the component  and we are not passing any argument to the function
// "_" we use this in the function parameter beacuse we are not getting any payload 
export const fetchUserDetails = createAsyncThunk<User | null, void, { rejectValue: String }>('auth/fetch-user-details', async (_, thunkApi) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            return thunkApi.rejectWithValue("No authorization token found")
        };
        const { data } = await backendApi("/api/v1/user/profile", {
            headers: {
                Authorization: `Bearer ${token}`,  // pass the token in header
            },
        })
        if (data.success) {
            return data.user;
        }
        else {
            return thunkApi.rejectWithValue(data.message);
        }


    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message;
            toast.error(message || "Something went wrong");
            return thunkApi.rejectWithValue(message || "Something went wrong");
        }
        return thunkApi.rejectWithValue("Something went wrong");
    }
})


// the slice  gives us the reducer function  and auto created action  creators 
// reducer is the function  that handles the states changes ,
// it takes the  (current state, action ) and return the new state 
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    localStorage.setItem("token", action.payload)
                }
            })
            .addCase(signInUser.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loggedInUser=action.payload;
                state.loading=false;
            })
            .addCase(fetchUserDetails.rejected, (state) => {
                state.loading = false;
            })

    }
})

export const authReducer = authSlice.reducer;
export const selectLoggedInUser = (state: RootState) => state.auth.loggedInUser
export const selectLoading = (state: RootState) => state.auth.loading