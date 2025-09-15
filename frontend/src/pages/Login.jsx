import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/auth", { email, password }, {
                withCredentials: true, // Ensures cookies are sent
            });

            console.log("Login success:", response);

            dispatch(setUser(response.data));  // Store in Redux & LocalStorage

            toast.success("Login successfull!", { position: "top-center" });

            setTimeout(() => {
                navigate("/home");
            }, 1500);

        } catch (err) {
            console.error(err);
            if (err.response) {
                // Show different error messages based on backend response
                if (err.response.status === 400) {
                    toast.error(err.response.data.message || "User does not exist.", { position: "top-center" });
                } else if (err.response.status === 401) {
                    toast.error("Invalid email or password. Please try again.", { position: "top-center" });
                } else {
                    toast.error("Login failed. Something went wrong.", { position: "top-center" });
                }
            } else {
                toast.error("Server error. Please try again later.", { position: "top-center" });
            }
        }
    };

    useEffect(() => {
        let data = localStorage.getItem("user");

        if (data) {
            navigate('/home');
        }else{
            navigate('/login')
        }
    }, [navigate]);

    return (
        <Container maxWidth="xs">
            <ToastContainer />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 25,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 2 }} 
                    onClick={handleSubmit}
                >
                    Login
                </Button>

                {/* ✅ "Not registered? Sign up" link */}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Not registered?{" "}
                    <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
                        Sign up here
                    </Link>
                  
                </Typography>

            </Box>
            
                  
        </Container>

       
    );
};

export default Login;
