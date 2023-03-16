import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const URL = process.env.URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected with MONGO_DB");
}).catch((err) => {
    console.log(err);
    console.log("Connection has not been extablished with database");
})