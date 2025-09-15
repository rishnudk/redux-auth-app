
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/auth", { email, password }, {
                withCredentials: true,
            });


            console.log("Login success:", response.data);

            dispatch(setUser(response.data));  

            toast.success("Login successfull!", { position: "top-center" })

            

            setTimeout(() => {
                navigate("/admin");
            }, 1500);

        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                toast.error("Invalid credentials. Please try again.", { position: "top-center" });
            } else {
                toast.error("Login failed. Something went wrong.", { position: "top-center" });
            }
            
        }
    };

    useEffect(()=> {
       let data = localStorage.getItem("user") 

       console.log(data);
       

       if(data){
        navigate('/admin')
       }else{
        navigate('/admin/login')
       }


    },[navigate])

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
                    Admin Login
                </Typography>
                
                {error && <Typography color="error">{error}</Typography>}

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
            </Box>
        </Container>
    );
}

export default AdminLogin