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
    dob: {
        type: Date,
        required: true,
        validate: {
            validator: function (value){
                const today = new Date();
                const age = today.getFullYear() - value.getFullYear();
                return age >=8 ;
            },
            message: 'Age must be greater than 8'
        }
    },
    photo :{
        type : String
    },
    friends: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    timestamp:{
        type: Date,
        default: Date.now
    }
});
userSchema.index({ timestamp : -1});
export default mongoose.model('Users',userSchema);