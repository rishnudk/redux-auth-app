import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Header = ({ onLogout }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleConfirmLogout = () => {
        setOpen(false);
        onLogout();  // Call logout function
    };

    return (
    
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Button color="inherit" onClick={handleOpen}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

          
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to log out?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmLogout} color="error">
                        Logout
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Header;
