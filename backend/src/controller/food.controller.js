const foodModel = require('../models/food.model');
const foodController = require('../controller/food.controller');
const storageService = require('../services/storage.service');
const likeModel=require('../models/likes.model');
const saveModel=require('../models/save.model')
const {v4: uuidv4 } = require('uuid');
async function addFood(req, res) {
    console.log(req.foodPartner);
    console.log(req.body);
    console.log(req.file);
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuidv4());
    console.log(fileUploadResult);
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    });
    res.status(201).json({ message: "Food item added successfully", foodItem });
} 
const getFood = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all foods
        const foods = await foodModel.find().sort({ createdAt: -1 });

        // Fetch user's likes and saves
        const userLikes = await likeModel.find({ user: userId }).select('food');
        const userSaves = await saveModel.find({ user: userId }).select('food');

        // Convert to Set for faster lookup
        const likedFoodIds = new Set(userLikes.map(like => like.food.toString()));
        const savedFoodIds = new Set(userSaves.map(save => save.food.toString()));

        // Add isLiked and isSaved flags to each video
        const foodsWithStatus = foods.map(food => ({
            ...food.toObject(),
            isLiked: likedFoodIds.has(food._id.toString()),
            isSaved: savedFoodIds.has(food._id.toString())
        }));

        res.status(200).json({
            message: "Foods fetched successfully",
            foodItems: foodsWithStatus
        });
    } catch (error) {
        console.error("Error fetching foods:", error);
        res.status(500).json({ message: "Error fetching foods", error: error.message });
    }
};

async function likeFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        console.log("🔵 LIKE REQUEST:", { userId: user._id, foodId });

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        });

        console.log("🔍 Already Liked?:", isAlreadyLiked);

        if (isAlreadyLiked) {
            console.log("❌ UNLIKING - already liked exists");
            
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            });

            const updatedFood = await foodModel.findByIdAndUpdate(
                foodId,
                { $inc: { likeCount: -1 } },
                { new: true }
            );

            console.log("📊 After unlike:", updatedFood.likeCount);

            return res.status(200).json({
                message: "Food unliked successfully",
                isLiked: false
            });
        }

        console.log("✅ LIKING - not liked yet");

        const like = await likeModel.create({
            user: user._id,
            food: foodId
        });

        const updatedFood = await foodModel.findByIdAndUpdate(
            foodId,
            { $inc: { likeCount: 1 } },
            { new: true }
        );

        console.log("📊 After like:", updatedFood.likeCount);

        res.status(201).json({
            message: "Food liked successfully",
            isLiked: true,
            like
        });
    } catch (error) {
        console.error("❌ ERROR in likeFood:", error.message);
        res.status(500).json({ message: "Error liking food", error: error.message });
    }
}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        });

        if (isAlreadySaved) {
            // Already saved → Unsave
            await saveModel.deleteOne({ user: user._id, food: foodId });

            await foodModel.findByIdAndUpdate(foodId, {
                $inc: { savesCount: -1 }
            });

            return res.status(200).json({
                message: "Food unsaved successfully",
                isSaved: false  // <== Added flag
            });
        }

        // Not saved → Save now
        await saveModel.create({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: 1 }
        });

        res.status(201).json({
            message: "Food saved successfully",
            isSaved: true  // <== Added flag
        });
    } catch (error) {
        console.error("❌ ERROR in saveFood:", error.message);
        res.status(500).json({ message: "Error saving food", error: error.message });
    }
}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}
module.exports = { addFood, getFood,likeFood,saveFood,getSaveFood };