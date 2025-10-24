const UserModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodPartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Cookie configuration for cross-origin
const cookieOptions = {
    httpOnly: true,
    secure: false, // Set to true in production with HTTPS
    sameSite: 'lax', // Changed from default 'strict'
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/'
};

async function registerUser(req, res) {
    const { firstname, lastname, email, password } = req.body;
    const isExistingUser = await UserModel.findOne({ email });
    if (isExistingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const user = new UserModel({ firstname, lastname, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, cookieOptions);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ message: 'User logged in successfully' });
}

async function logoutUser(req, res) {
    res.clearCookie('token', cookieOptions);
    res.status(200).json({ message: 'User logged out successfully' });
}

async function registerfoodPartner(req, res) {
    const { name, contactName, phone, email, password, address } = req.body;
    const isExistingUser = await foodPartnerModel.findOne({ email });
    if (isExistingUser) {
        return res.status(400).json({ message: 'Food Partner already exists' });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        const foodPartner = new foodPartnerModel({ 
            name, 
            contactName, 
            phone, 
            email, 
            password: hashedPassword, 
            address 
        });
        await foodPartner.save();
        const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
        res.cookie('token', token, cookieOptions);
        res.status(201).json({ message: 'Food Partner registered successfully' });
    } catch (error) {
        console.error("Food partner register error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function loginfoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });
    if (!foodPartner) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = bcrypt.compareSync(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ message: 'Food Partner logged in successfully' });
}

async function logoutfoodPartner(req, res) {
    res.clearCookie('token', cookieOptions);
    res.status(200).json({ message: 'Food Partner logged out successfully' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerfoodPartner,
    loginfoodPartner,
    logoutfoodPartner
};
