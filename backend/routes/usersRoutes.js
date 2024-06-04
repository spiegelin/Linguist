import express from 'express';
import { getUserById, editUser } from "../models/userModel.js";
import cookieJwtAuth from '../auth/cookieJwtAuth.js';

const router = express.Router();

// Show user profile information in Profile.jsx
router.get('/profile-info', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
    const user = await getUserById(userId);

    res.send({ first_name : user[0].first_name ? user[0].first_name : "", 
        // If the user has no last name, return an empty string
        last_name : user[0].last_name ? user[0].last_name : "", 
        language1 : user[1]? user[1] : "", 
        language2 : user[2] ? user[2] : "", 
        language3 : user[3] ? user[3] : ""} );
});

// Get current user profile information in ConfigProfile.jsx
router.get('/edit-profile', cookieJwtAuth, async (req, res) => {
    // Get user id from token
    const userId = req.user.user_id;
    const user = await getUserById(userId);

    res.send({ 
        // If the user has no first name, return an empty string
        first_name : user[0].first_name ? user[0].first_name : "",
        last_name : user[0].last_name ? user[0].last_name : "",
        email: user[0].email ? user[0].email : "",
        country : user[0].country ? user[0].country : "",
        contact_num : user[0].contact_num ? user[0].contact_num : "",
        language1 : user[1] ? user[1] : "", 
        language2 : user[2] ? user[2] : "", 
        language3 : user[3] ? user[3] : ""
     });
});

// Edit user profile in ConfigProfile.jsx
router.post('/edit-profile', cookieJwtAuth, async (req, res) => {
    // Get user id from token
    const userId = req.user.user_id;

    // Get all the fields from the request
    // newLanguages is an array of languages that the user wants to change
    const { first_name, last_name, country, contact_num, newLanguages } = req.body;
    await editUser(userId, first_name, last_name, country, contact_num, newLanguages);
    res.send({ message: 'Profile updated',
        success: true
     });
});


export default router;