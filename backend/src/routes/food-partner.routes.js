const express = require('express');
const { getFoodPartnerById } = require('../controller/food-partner.controller');
const { authUserMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();
router.get('/:id',authUserMiddleware,getFoodPartnerById);
module.exports = router;