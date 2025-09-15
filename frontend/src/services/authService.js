import axios from "axios";

const API_URL = "http://localhost:8000/api";

const authService = {
    registerUser: async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData, {
            withCredentials: true, // Ensures cookies are set
        });
        return response.data;
    },

    loginUser: async (userData) => {
        const response = await axios.post(`${API_URL}/auth`, userData, {
            withCredentials: true,
        });
        return response.data;
    },

    logoutUser: async () => {
        try {
            await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

           
            localStorage.removeItem("user");
            document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
};

export default authService;
