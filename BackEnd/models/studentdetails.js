import mongoose from "mongoose";
const schema = mongoose.Schema

const student = new schema({
    name: {
        type:String,
        required:true
    },
    rollnum:{
        type:String,
        required:true
    },
    uremail: {
        type:String,
        required:true
    },
    phnum: {
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    clg:{
        type:String,
        required:true
    },
    hodemail:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    }
})
export default mongoose.model('studentdetails',student)