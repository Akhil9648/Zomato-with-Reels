const express = require('express');
const { registerUser, loginUser, logoutUser, registerfoodPartner, loginfoodPartner, logoutfoodPartner } = require('../controller/auth.controller');
const router = express.Router();

router.post('/user/register',registerUser);
router.post('/user/login',loginUser);
router.get('/user/logout',logoutUser);
router.post('/food-partner/register',registerfoodPartner);
router.post('/food-partner/login',loginfoodPartner);
router.get('/food-partner/logout',logoutfoodPartner);
module.exports = router;