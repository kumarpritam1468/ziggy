const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

const connectToDB = require('./config/conn.js');

const foodRoutes = require('./routes/foodRoutes.js');

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/food', foodRoutes);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    connectToDB();
})