const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    service: {
        type: String,
        required: true,
        enum: [
            'Web Development',
            'App Development', 
            'Google Ads',
            'Data Analytics',
            'Digital Marketing',
            'UI/UX Design'
        ]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);