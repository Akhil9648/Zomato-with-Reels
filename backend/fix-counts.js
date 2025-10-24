// MUST come FIRST - before any imports
require('dotenv').config();

const connectDB = require('./src/db/db');
const foodModel = require('./src/models/food.model');

async function fixCounts() {
    try {
        console.log('🔵 MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ NOT FOUND');
        
        await connectDB();
        console.log('✅ Connected to MongoDB');

        const result = await foodModel.updateMany(
            {
                $or: [
                    { likeCount: { $exists: false } },
                    { savesCount: { $exists: false } }
                ]
            },
            {
                $set: {
                    likeCount: 0,
                    savesCount: 0
                }
            }
        );

        console.log(`✅ Updated ${result.modifiedCount} documents`);

        const foods = await foodModel.find();
        console.log('\n📋 All food items:');
        foods.forEach(food => {
            console.log(`- ${food.name}: likes=${food.likeCount}, saves=${food.savesCount}`);
        });

        console.log('\n✅ Done! Exiting...');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

fixCounts();
