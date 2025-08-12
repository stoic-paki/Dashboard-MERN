import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';
const mongo_url = process.env.MONGO_CONN
console.log(mongo_url)

mongoose.connect(mongo_url).then(()=>console.log('connected successfully')).catch((err)=>{
    console.log(`mongo db error ${err}`)
})