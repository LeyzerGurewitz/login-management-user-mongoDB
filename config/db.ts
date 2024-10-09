import mongoose from 'mongoose';

const connectDB = async(): Promise<void> => {
    try{
        const connect = await mongoose.connect("mongodb+srv://leyzer3770:XwWgFFt8RJdKON14@cluster0.r6pf0.mongodb.net/UserModel?retryWrites=true&w=majority&appName=Cluster0") 
        console.log("mongo connect")
    }
    catch(error){
        console.log(error)
    }
}

export default connectDB;