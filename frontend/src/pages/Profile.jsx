import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "../redux/slices/authSlice";
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router";
import Header from "../components/Header";

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "")
    const [profilePic, setProfilePic] = useState(user?.profilePic || "");
    const [editing, setEditing] = useState(false);
    const [imageFile, setImageFile] = useState(null);


    useEffect(() => {

        // console.log("1st " , username, profilePic );
        
        
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get("http://localhost:8000/api/profile", { withCredentials: true });
                dispatch(setUser(data));  
                setUsername(data.username);
                setProfilePic(data.profilePic); 
                // console.log("2nd " , username, profilePic );
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };
        
        if (!user) fetchProfile(); 
    }, [dispatch, user]);
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setProfilePic(URL.createObjectURL(file));
        }
      
    };


    const handleSave = async () => {
        const updatedUser = { ...user, username };

        const resp = await axios.put("http://localhost:8000/api/profile/edit", {
            username,
            email,
            userId : user._id
        })

        // resp.catch((e)=>{console.log(e)})
    
        

        if (imageFile) {
            const formData = new FormData();
            formData.append("profilePic", imageFile);
    
            try {
                const { data } = await axios.put(
                    "http://localhost:8000/api/profile/upload",
                    formData,
                    { 
                        withCredentials: true, 
                        headers: { 
                            "Content-Type": "multipart/form-data" 
                        } 
                    }
                );
                updatedUser.profilePic = data.profilePic;
            } catch (error) {
                console.error("Image upload failed", error);
                return;
            }
        }
    
        dispatch(setUser(updatedUser));
        setEditing(false);
    };
    

    return (
        <>
            <Header />
            <Box sx={{ textAlign: "center", maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>Profile</Typography>

                {user ? (
                    <>
                        <Avatar src={profilePic || "/default-avatar.png"} sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />

                        {editing ? (
                            <>
                                <input type="file" accept="image/*"  onChange={handleFileChange} />
                                <TextField fullWidth margin="normal" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
                                <Button variant="contained" onClick={()=>setEditing(false)} sx={{ mt: 2,ml : 1 }} >Back</Button>
                            </>
                        ) : (
                            <>
                                <Typography variant="h6">{user.username}</Typography>
                                <Typography variant="body1">{user.email}</Typography>
                                <Button variant="outlined" onClick={() => setEditing(true)} sx={{ mt: 2 }}>Edit Profile</Button> <br />
                                <Button variant="text" onClick={() => navigate(-1)} sx={{ mt: 2 }}>Back</Button>
                            </>
                        )}
                    </>
                ) : (
                    <Typography>Please log in.</Typography>
                )}
            </Box>
        </>
    );
};

export default Profile;
