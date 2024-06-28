const express = require('express');
const dotenv = require('dotenv');

const connectToDB = require('./db/conn.js');

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
    connectToDB();
})