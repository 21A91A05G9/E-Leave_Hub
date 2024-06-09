import mongoose from "mongoose";
const schema = mongoose.Schema

const hod = new schema({
    name: {
        type:String,
        required:true
    },
    email: {
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
    pwd:{
        type:String,
        required:true
    }
    
})
export default mongoose.model('hoddetails',hod)