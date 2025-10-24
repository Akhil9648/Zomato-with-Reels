const app=require('./src/app');
require('dotenv').config();
const connectDB = require('./src/db/db');
const PORT=process.env.PORT || 3000;

connectDB();
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});