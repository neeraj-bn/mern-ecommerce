const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth/auth-routes')

//create db connection -> can also create seperate file and then us ethat file here

mongoose.connect('mongodb+srv://neerajbn:Neeraj%406696@cluster0.stqlb.mongodb.net/')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

const app = express()
const PORT = process.env.PORT || 5000

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))