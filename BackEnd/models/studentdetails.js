import mongoose from "mongoose";
const schema = mongoose.Schema

const student = new schema({
    name: {
        type:String,
        required:true
    },
    rollNo:{
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
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
    hodEmail:{
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
export default mongoose.model('studentdetails',student)