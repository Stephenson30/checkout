import mongoose, { Schema, models } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    business_name:{
        type: String,
        required: true,
    },
    business_image:{
        type: String,
        required: true,
    },
    business_address:{
        type: String,
        required: true,
    },
}, {timestamps: true});


const User = models.User || mongoose.model("User", userSchema);
export default User;