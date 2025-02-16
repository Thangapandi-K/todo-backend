import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


const userController = {

    //REGISTER USER
    register: async(request, response) => {
        try {
            //getting details
            const {username, email, password} = request.body;
            //validation
            if(!username || !email || !password) {
                return response.status(400)
                            .json({
                                success: false, 
                                message: "Please Provide All Fields !"
                            })
            };
            //check existing user
            const existingUser = await User.findOne({email});
            if(existingUser) {
                return response.status(400)
                            .json({
                                success: false, 
                                message: "User Already Exists !"
                            })
            };
            //hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            //save user
            const newUser = new User({username, email, password: hashedPassword});
            await newUser.save();
            //on success
            response.status(201)
                .json({
                    success: true,
                    message: "User Registered Successfully !"
                })
        } catch (error) {
            response.status(400)
                .json({
                    success: false, 
                    message: "User Registration Failed !"
                });
        }
    },

    //LOGIN USER
    login: async(request, response) => {
        try {
            //getting details
            const {email, password} = request.body;
            //validation
            if(!email || !password) {
                return response.status(400)
                            .json({
                                success: false, 
                                message: "Please Provide All Fields !"
                            })
            };
            //check user exists
            const user = await User.findOne({email});
            if(!user) {
                return response.status(404)
                            .json({
                                success: false, 
                                message: "User Not Found !"
                            })
            };
            //check password
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if(!isPasswordMatch) {
                return response.status(400)
                .json({
                    success: true,
                    message: "Password Incorrect !"
                });
            };
            //creating JWT Token
            const token = JWT.sign({id: user._id}, process.env.SECRET_KEY);
            //setting token in cookies
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.DEV_MODE === "production",
                path:'/',
                maxAge: 24*60*60*1000
            }
            response.cookie('token', token, cookieOptions);
            //on success
            response.status(200)
                .json({
                    success: true,
                    message: "User Login Successfully !",
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
        } catch (error) {
            console.log(error)
            response.status(400)
                .json({
                    success: false, 
                    message: "User Login Failed !"
                });
        }
    },

    //LOG OUT
    logout: async(request, response) => {
        try {
            //clear cookie
            response.clearCookie('token');
            response.redirect('/');
        } catch (error) {
            response.status(500).json({success: false, message: error.message})
        }
    },

    //CHECK AUTH
    checkAuth: async(request, response) => {
        try {
        const token = request.cookies.token;
        
        if(!token) {
            return response.status(401).json({success: false, message: "Access Denied Login Again!"})
        }
        
            try {

                const checkToken = JWT.verify(token, process.env.SECRET_KEY);

                if(checkToken) {
                    //on success
                    return response.status(200).json({success: true});
                }

            } catch (error) {
                return response.status(401).json({ success: false, message: "Invalid Token"});
            }
        } catch (error) {   
            response.status(400)
                .json({
                    success: false, 
                    message: "Access Denied !"
                });
        }
    },

    //GET USER PROFILE
    getProfile: async(request, response) => {
        try {
            
            //getting user id
            const {userId} = request.body;
            //getting user details
            const user = await User.findById(userId);
            //on success
            response.status(200).json({status: true, user: user});
            
        } catch (error) {
            response.status(400)
                .json({
                    success: false, 
                    message: "Profile Fetching Failed !"
                });
        }
    }
};

//exports
export default userController;