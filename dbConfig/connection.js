const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Connected to Mongodb ${mongoose.connection.host} database`);
    }
    catch(e){
        console.log(`${e}`);
    }
}

module.exports = {connectMongoDB};