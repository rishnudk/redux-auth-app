import { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify"; 
import axios from "axios";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, TextField, IconButton, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Button, MenuItem
} from "@mui/material";
import { Edit, Delete, Save, Search, Add, Cancel } from "@mui/icons-material";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import authService from "../services/authService";
import { useDispatch } from "react-redux";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const [search, setSearch] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const [role, setRole] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/admin/login");
        }
    }, [navigate]);

    useEffect(() => {
    fetchUsers(currentPage);
}, [currentPage]);


  const fetchUsers = async (page = 1) => {
    try {
        const response = await axios.get(`http://localhost:8000/api?page=${page}&limit=5`, {
            withCredentials: true,
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


    const handleEdit = (user) => {
        setEditingId(user._id);
        setEditedUser({ ...user });
    };

    
   const handleSave = async () => {
  if (!editingId) return;

  try {
    const response = await axios.put(
      `http://localhost:8000/api/${editingId}`,
      editedUser,
      { withCredentials: true }
    );

    setUsers(users.map((user) => (user._id === editingId ? response.data : user)));
    setEditingId(null);
    toast.success("User updated successfully!", { position: "top-center" });

  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message, { position: "top-center" }); 
    } else {
      toast.error("Something went wrong while updating user.", { position: "top-center" });
    }
    console.error("Error updating user:", error);
  }
};


    const handleDeleteConfirm = (id) => {
        setSelectedUserId(id);
        setDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/${selectedUserId}`, { withCredentials: true });
            setUsers(users.filter((user) => user._id !== selectedUserId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
        setDeleteDialogOpen(false);
    };

    const handleCreateUser = async () => {
        if (!newUser.username || !newUser.email || !newUser.password || !newUser.confirmPassword) {
           toast.error("Please fill all fields!", { position: "top-center" });
            return;
        }
    
        if (newUser.password !== newUser.confirmPassword) {
           toast.error("Passwords do not match!", { position: "top-center" });
            return;
        }
        if (newUser.password.length < 6) {
          toast.error("Password must be at least 6 characters long.", { position: "top-center" });
            return;
        }
        
    
        try {
            const response = await axios.post("http://localhost:8000/api/register", newUser, { withCredentials: true });
            setUsers([...users, response.data]);
            setCreateDialogOpen(false);
            setNewUser({ username: "", email: "", password: "", confirmPassword: "", role: "user" });
        } catch (error) {
         if (error.response && error.response.status === 400) {
            toast.error("Email already used!", { position: "top-center" });
        } else {
            toast.error("Something went wrong. Please try again.", { position: "top-center" });
        }
        console.error("Error creating user:", error);
        }
    };
    

    const handleLogout = async () => {
        await authService.logoutUser();
        dispatch({ type: "auth/logout" });
        navigate("/admin/login");
    };

    return (
        <>

        <ToastContainer />
            <Header onLogout={handleLogout} />
            <div style={{ padding: "20px" }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Dashboard</h2>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                    <TextField
                        label="Search by Username"
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            endAdornment: <Search />
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => setCreateDialogOpen(true)}
                        style={{ marginLeft: "10px" }}
                    >
                        Create User
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>ID</b></TableCell>
                                <TableCell><b>Username</b></TableCell>
                                <TableCell><b>Email</b></TableCell>
                                <TableCell><b>Role</b></TableCell>
                                <TableCell><b>Actions</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
                                .map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user._id}</TableCell>
                                        <TableCell>
                                            {editingId === user._id ? (
                                                <TextField
                                                    value={editedUser.username || ""}
                                                    onChange={(e) =>
                                                        setEditedUser({ ...editedUser, username: e.target.value })
                                                    }
                                                    size="small"
                                                />
                                            ) : (
                                                user.username
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === user._id ? (
                                                <TextField
                                                    value={editedUser.email || ""}
                                                    onChange={(e) =>
                                                        setEditedUser({ ...editedUser, email: e.target.value })
                                                    }
                                                    size="small"
                                                />
                                            ) : (
                                                user.email
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {user.isAdmin ? "Admin" : "User"}
                                        </TableCell>
                                        <TableCell>
                                            {editingId === user._id ? (
                                                <IconButton color="primary" onClick={handleSave}>
                                                    <Save />
                                                </IconButton>
                                            ) : (
                                                user.isAdmin !== true && (
                                                    <>
                                                        <IconButton color="secondary" onClick={() => handleEdit(user)}>
                                                            <Edit />
                                                        </IconButton>
                                                        <IconButton color="error" onClick={() => handleDeleteConfirm(user._id)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </>
                                                )
                                            )}


                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
    <Button
        variant="contained"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        style={{ marginRight: 10 }}
    >
        Previous
    </Button>
    <span style={{ paddingTop: "10px" }}>
        Page {currentPage} of {totalPages}
    </span>
    <Button
        variant="contained"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{ marginLeft: 10 }}
    >
        Next
    </Button>
</div>

            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this user? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        <Cancel /> Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        <Delete /> Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create User Dialog */}
            <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)}>
                <DialogTitle>Create New User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Username"
                        fullWidth
                        margin="dense"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="dense"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        margin="dense"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <TextField
                        label="Confirm Password"
                        fullWidth
                        margin="dense"
                        type="password"
                        value={newUser.confirmPassword}
                        onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    />

                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCreateDialogOpen(false)} color="primary">
                        <Cancel /> Cancel
                    </Button>
                    <Button onClick={handleCreateUser} color="primary">
                        <Add /> Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Admin;