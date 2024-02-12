import mongoose from 'mongoose';
import 'dotenv/config';


const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Mongo DB Connection Successful')
    } catch (error) {
        console.log('Mongo DB Connection Successful', error)
    }

}

export default db;