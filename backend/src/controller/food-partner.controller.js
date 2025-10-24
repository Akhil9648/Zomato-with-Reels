const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    try {
        const foodPartner = await foodPartnerModel.findById(foodPartnerId).select('-password');
        if (!foodPartner) {
            return res.status(404).json({ message: 'Food Partner not found' });
        }

        const foodItems = await foodModel.find({ foodPartner: foodPartnerId });

        const totalMeals = foodItems.length;
        const customersServed = 0; // You can replace with real calculation if you have orders

        res.status(200).json({
            message: 'Food Partner fetched successfully',
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems,          // matches frontend
                totalMeals,         // matches frontend
                customersServed     // matches frontend
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Food Partner', error });
    }
}

module.exports = { getFoodPartnerById };
