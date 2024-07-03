import mongoose from "mongoose";
const schema = mongoose.Schema

const hod = new schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    phoneNo: {
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required: true
    }
})
export default mongoose.model('hoddetails',hod)