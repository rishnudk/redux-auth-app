import express from 'express' 
import upload from '../middlewares/multer.js';
import { 
    createUser, 
    loginUser, 
    logoutCurrentUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
    updateUserProfilePic
} from '../controllers/userController.js';

import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/register', createUser);

// User authentication routes
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);

// Profile routes
router.route('/profile').get(authenticate, getCurrentUserProfile);
router.put('/profile/upload', authenticate, upload.single('profilePic'), updateUserProfilePic); 
router.put('/profile/edit', updateCurentUserProfile); 

// Admin routes
router.route('/')
    .get(authenticate, authorizeAdmin, getAllUsers);  // Get all users (admin)
    
router.route('/:id')
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin, updateUserById);

export default router;
