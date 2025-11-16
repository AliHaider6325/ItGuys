import mongoose from 'mongoose'

async function connectDB(){
    await mongoose.connect("mongodb+srv://meharbanali6325_db_user:ZiygZZQbvZxsfwai@cluster0.u7wgucy.mongodb.net/?appName=Cluster0")
}

export default connectDB;