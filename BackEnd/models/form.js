import mongoose from "mongoose";
const schema = mongoose.Schema

const form = new schema({
    name: {
        type:String,
        required:true
    },
    rollnum: {
        type:String,
        required:true
    },
    fdate:{
        type:String,
        required:true
    },
    tdate:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    hodEmail: {
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    count:{
        type:String,
        required:true
    },
})
export default mongoose.model('forms',form)