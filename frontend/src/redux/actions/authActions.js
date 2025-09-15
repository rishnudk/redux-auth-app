import axios from "axios";
import { setUser } from "../slices/authSlice";

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post("http://localhost:8000/api/auth/login", { email, password }, { withCredentials: true });

        dispatch(setUser(data)); 
    } catch (error) {
        console.error("Login Failed:", error);
    }
};
