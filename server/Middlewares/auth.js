const { User } = require('../Model/user.model');
const jwt = require('jsonwebtoken');

const authenticateMiddleware = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(403).json({ status: false, message: 'Token not provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken.user || !decodedToken.user._id) {
            return res.status(403).json({ status: false, message: 'Invalid token' });
        }

        const user = await User.findById(decodedToken.user._id);
        if (!user) {
            return res.status(403).json({ status: false, message: 'User not found' });
        }

        res.locals.user = user;
        return res.status(200).json({ status: true, user });
        
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error('Token has expired');
            return res.status(401).json({ status: false, message: 'Token has expired' });
        }
        console.error('Error verifying token:', error);
        return res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

module.exports = authenticateMiddleware;
