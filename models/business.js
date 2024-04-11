import mongoose, { Schema, models } from "mongoose";


const businessSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
});

const Business = models.Business || mongoose.model('Business', businessSchema);

export default Business;