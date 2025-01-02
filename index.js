const express = require('express');
const connectDB = require('./config/db');

const authRoute = require('./routes/user.js');
const cors = require('cors');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('api/user', authRoute);

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});