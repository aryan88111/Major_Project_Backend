// Load environment variables first
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const authRoute = require('./routes/user.js');
const propertyRoutes = require('./routes/property');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', authRoute);
app.use('/api/property', propertyRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});