import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
        return null;
    }
};

const storedUser = getUserFromStorage(); 

const initialState = {
    user: storedUser,  
    isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(action.payload));  
            document.cookie = `user=${encodeURIComponent(JSON.stringify(action.payload))}; path=/; secure`; 
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("user");  
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },
    },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
