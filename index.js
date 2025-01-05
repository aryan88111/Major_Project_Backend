const express = require('express');
const connectDB = require('./config/db');

const authRoute = require('./routes/user.js');
const propertyRoutes = require('./routes/property');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/user', authRoute);
app.use('/property', propertyRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});