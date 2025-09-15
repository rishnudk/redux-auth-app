import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/authService";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); 
    console.log(user);
    

    const handleProfileClick = () => {
        if (user) {
            navigate("/profile");
        } else {
            navigate("/login"); 
        }
    };

    useEffect(() => {
        let data = localStorage.getItem('user')

        if (!user || user.isAdmin == true) {
            navigate(-1)
        }

    },[navigate])


    

    const handleLogout = async () => {
        await authService.logoutUser();
        dispatch({ type: "auth/logout" }); 

        console.log("Logged Out");
        
        navigate("/login"); 

      };

    return (
        <>
            <Header onLogout={handleLogout} />
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 30,
                        p: 3,
                        boxShadow: 3,
                        borderRadius: 2,
                        bgcolor: "background.paper",
                        cursor: "pointer",
                        "&:hover": { boxShadow: 6 },
                    }}
                    onClick={handleProfileClick}
                >
                    <Avatar
                    
                        src={user?.profilePic || "http://localhost:8000/api/profile"}
                        alt={user?.username || "Guest"}
                        sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h5">
                        {user ? user.username : "Guest"}
                    </Typography>
                </Box>
            </Container>
            <Footer />
        </>
    );
};

export default Home;
