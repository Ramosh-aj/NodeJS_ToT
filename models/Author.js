
const mongoose = require("mongoose");

//creat Author Schema

const autherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    image: {
        type: String,
        default: "default-avatar.png",

    },
},
{
    timestamps: true
});


const Author = mongoose.model("Author",autherSchema);

module.exports = {
    Author
}