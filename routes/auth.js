const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
//Register
router.post("/register", async (req, res)=> {
    
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
        
    }catch (err) {
        res.status(500).json(err)
    }
    
    })

    //Login
    router.post("/login", async (req, res) => {
        try {
            // Find the user by email
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json("User not found");  // Stop execution after response
            }
    
            // Check if the password is valid
           
            // console.log(req.body.password)
            // console.log(hashedPassword);
        
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json("Wrong password");  // Stop execution after response
            }
    
            // Respond with the user data if everything is correct
            return res.status(200).json(user);
        } catch (err) {
            // Log the error for debugging
            console.error("Login error:", err);
            return res.status(500).json("An error occurred while processing your request.");  // Stop execution after response
        }
    });
    

module.exports = router