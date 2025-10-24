const express = require('express');
const multer = require('multer');
const { authFoodPartnerMiddleware, authUserMiddleware } = require('../middlewares/auth.middleware');
const router = express.Router();
const { addFood, getFood, likeFood, saveFood, getSaveFood } = require('../controller/food.controller');
const upload = multer({
    storage: multer.memoryStorage(),
});
router.post('/',authFoodPartnerMiddleware,upload.single('video'),addFood);
router.get('/',authUserMiddleware,getFood);
router.post('/like',authUserMiddleware,likeFood);
router.post('/save',authUserMiddleware,saveFood);
router.get('/save',authUserMiddleware,getSaveFood)
module.exports = router;