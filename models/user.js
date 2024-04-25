import mongoose, { Schema, models } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    family_name: {
        type: String,  
        required: false
    },
    given_name: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    iss: {
        type: String,
        required: false
    },
    business_name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
}, {timestamps: true});

const User = models.User || mongoose.model("User", userSchema);
export default User;