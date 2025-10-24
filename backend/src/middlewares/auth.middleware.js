const foodPartnerModel = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Please login first (partner)" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        if (!foodPartner) {
            return res.status(401).json({ message: "Food partner not found" });
        }

        req.foodPartner = foodPartner;
        next();
    } catch (error) {
        console.error("authFoodPartnerMiddleware error:", error);
        return res.status(401).json({ message: "Unauthorized partner" });
    }
}

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        console.log("⚠️ No token found in cookies");
        return res.status(401).json({ message: "Please login first" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            console.log("⚠️ No user found for decoded token");
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("authUserMiddleware error:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
