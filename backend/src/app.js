const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:5173',
        'https://zomato-with-reels.vercel.app'
    ],
    credentials: true,
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
})); 
app.use(cookieParser());
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);
module.exports = app;