import User from "../models/userModel.js";
import JWT from 'jsonwebtoken';


export const isLoggedIn = async(request, response, next) => {
    try {
        const token = request.cookies.token;

        if(!token) {
            return response.status(401).json({success: false, message: "Access Denied, Login !"})
        }
        
        const decoded = JWT.verify(token, process.env.SECRET_KEY);
        
        const userId = decoded.id;

        const user = await User.findById(userId);

        if(!user) {
            return response.status(401).json({success: false, message: "Access Denied !"})
        }
        request.body.userId = userId;
        next()
    } catch (error) {
        return response.status(400).json({success: false, message: "Access Denied !"})
    }
};
export const isAdmin = (request, response, next) => {
    try {

        next()
    } catch (error) {
        response.send(400).json({success: false, message: "Access Denied !"})
    }
};