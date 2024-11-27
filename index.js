require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { connectMongoDB } = require('./dbConfig/connection');

const app = express();

const userRouter = require('./routes/userRoute');
const roleRouter = require('./routes/roleRoute');

connectMongoDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(morgan('dev'));

app.use('/api/user',userRouter);
app.use('/api/role',roleRouter);

const port = process.env.PORT || 8001;
app.listen(port,()=>{
    console.log(process.env.DEV_MODE);
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${port}`);
});
