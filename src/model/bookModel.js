const mongoose = require("mongoose")
//const { required } = require("nodemon/lib/config")
const objectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({

    "title": {
        type: String,
        required: true,
        trim: true
    },
    "ISBN": {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    "excerpt": {
        type: String,
        required: true,
        trim: true
    },
    "userid": {
        type: objectId, ref: "user", trim: true
    },
    "category": {
        type: String,
        required: true,
        trim: true
    },
    "subcategory": {
        type: String,
        required : true,
        trim: true
    },
    "reviews": {
        type: Number,
        default: false,
        trim: true
        
    },
    "isDeleted": {
        type: Boolean,
        default: false,
        trim: true
    },
    "deletedAt": {type:Date, trim:true},
    "releasedAt":{
       type:  Date,
       required: true,
      format: "YYYY-MM-DD",
      trim: true
    }


}, { timestamps: true })

module.exports = mongoose.model("book", bookSchema)