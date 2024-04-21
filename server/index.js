require('dotenv').config()

const router = require('./router/index');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errormiddleware = require('./middlewares/ErrorMiddleware');

const PORT = process.env.PORT || 5000;
const app = express();
const URL_DB = process.env.DB_URL || 'mongodb+srv://root:JebVQRTuRGqT2ycj@cluster.zljhqd5.mongodb.net/?retryWrites=true&w=majority';

const clientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.json());
app.use(cors({
        credentials: true,
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    }
));
app.use(cookieParser());
app.use('/api', router);
app.use(errormiddleware);

const start = async () => {
    try {
        await mongoose.connect(URL_DB, clientOptions);
        // Send a ping to confirm a successful connection
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
}
start()