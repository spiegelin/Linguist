//usersRoutes
import express from 'express';
import { getUserById, editUser, editProfileImage, getProfileImage, updatePassword } from "../models/userModel.js";
import cookieJwtAuth from '../auth/cookieJwtAuth.js';
import bcrypt from 'bcrypt';



const router = express.Router();

// Show user profile information in Profile.jsx
router.get('/profile-info', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
    const user = await getUserById(userId);

    res.send({ first_name : user[0].first_name ? user[0].first_name : "", 
        // If the user has no last name, return an empty string
        last_name : user[0].last_name ? user[0].last_name : "", 
        language1 : user[1] ? user[1] : "", 
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
        native_language : user[0].native_language ? user[0].native_language : "",
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
    let { first_name, last_name, country, contact_num, newLanguages } = req.body;

    // If the user has no languages, set it to "English"
    newLanguages = newLanguages.map(language => language === "" ? "English" : language);
    
    await editUser(userId, first_name, last_name, country, contact_num, newLanguages);
    res.send({ message: 'Profile updated',
        success: true
     });
});

router.post('/edit-password', cookieJwtAuth, async (req, res) => {
    const { user_id, email, password } = req.user;
    const { current_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password) {
        res.status(400).send({ message: 'Passwords do not match' });
        return;
    }

    if (new_password.length < 6) {
        res.status(400).send({ message: 'Password must be at least 6 characters long' });
        return;
    }

    // Check if the current_password and real password are correct
    bcrypt.compare(current_password, password, (err, result) => {
      if (err) {
          console.log(err);
      }

      // Si el resultado es falso, se envía un mensaje de error
      if (!result) {
          res.json({
              message: "Password edit failed"
          });
      } 

      // Hash the new password
      bcrypt.hash(new_password, 5, async (err, hash) => {
          if (err) {
              console.log(err);
          }

          updatePassword(user_id, hash);
        });
    });

    res.clearCookie('token'); // Elimina la cookie llamada 'token'

    //res.redirect(process.env.FRONTEND_URL + "/login") // Redirige a la página de login

    res.send({ message: 'Password updated, need to login again next time',
        success: true
    });
});

// Route to upload profile image
router.post('/upload-profile-image', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
    const imageBase64 = req.body;
  
    // Convert base64 image to binary
    const imageBuffer = Buffer.from(imageBase64.imageBase64, 'base64');
  
    try {
      await editProfileImage(userId, imageBuffer);
      //console.log('Profile image updated successfully');
      res.status(200).send({ message: 'Profile image updated successfully' });
    } catch (error) {
      console.error('Error updating profile image:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
});

// Route to get profile image
router.get('/profile-image', cookieJwtAuth, async (req, res) => {
    const userId = req.user.user_id;
  
    try {
        const result = await getProfileImage(userId);
  
      if (result.rows.length > 0 && result.rows[0].profile_image) {
        const imageBuffer = result.rows[0].profile_image;
        const imageBase64 = imageBuffer.toString('base64');
        res.send({ imageBase64 });
      } else {
        res.status(404).send({ message: 'Profile image not found' });
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

router.get('/profile-image/:id', async (req, res) => {
    const userId = req.params.id;
  
    try {
        const result = await getProfileImage(userId);
  
      if (result.rows.length > 0 && result.rows[0].profile_image) {
        const imageBuffer = result.rows[0].profile_image;
        const imageBase64 = imageBuffer.toString('base64');
        res.send({ imageBase64 });
      } else {
        res.status(404).send({ message: 'Profile image not found' });
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
      res.status(500).send({ message: 'Internal server error' });
    }
  });

export default router;