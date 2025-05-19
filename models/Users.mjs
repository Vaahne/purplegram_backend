import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] 
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{9,}$/ , 'Enter a combination of at least six numbers, letters and punctuation marks (like ! and &). ']
    },
    gender : {
        type : String,
        required: true,
        enum : ["male","female"]
    },
    age: {
        type: Number,
        required: true,
        min: 8,
        max: 99
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    photo :{
        type : String
    },
    friends: {
        type : [String]
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

userSchema.index({userId: 1});

export default mongoose.model('Users',userSchema);