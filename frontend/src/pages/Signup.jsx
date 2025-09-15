import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; 
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
          
            const { confirmPassword, ...payload } = data;
            console.log("Payload being sent from React:", payload);
            const response = await axios.post("http://localhost:8000/api/register", payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, 
            });

           
            dispatch(setUser(response.data)); 

            toast.success("Sign up successful!", { position: "top-center" });

            setTimeout(() => {
                navigate("/home");
            }, 1500);
        } catch (err) {
            console.error("Signup error:", err);

          
            if (err.response && err.response.status === 400) {
                toast.error("User already exists", { position: "top-center" });
            } else {
                toast.error("Signup failed. Please try again.", { position: "top-center" });
            }
        }
    };

    useEffect(() => {
        let data = localStorage.getItem("user");

        if (data) {
            navigate('/home');
        } else {
            navigate('/signup');
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
                    mt: 10,
                    p: 3,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Sign Up
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        {...register("username", { required: "Username is required" })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address",
                            },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Password"
                        margin="normal"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <TextField
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        margin="normal"
                        {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Sign Up
                    </Button>

                    <Typography variant="body2" sx={{ mt: 2 , ml:9 }}>
                        Already registered?{" "}
                        <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
                            Login here
                        </Link>
                    </Typography>
                </form>
            </Box>
        </Container>
    );
};

export default Signup;
