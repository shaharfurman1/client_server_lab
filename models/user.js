import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email : String,
    firstName : String,
    lastName : String,
    password : String
})

const User = mongoose.model('User', userSchema)

export default User;