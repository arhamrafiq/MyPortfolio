import mongoose from "mongoose";

const userModel = new mongoose.Schema({
        name :{
            type: String , 
            require : true , 
            trim : true , 
        },
        email : {
            type : String ,
            require : true,
            unique : true
        },
        Phone: {
            type : String , 
            require : true,
            unique : true,
            trim : true
        },
        password : {
            type : String,
        },
        isAdmin : {
            type : Number,
            default : 0 , 
        }
    },

    {
        timestamps: true,
    }
)

export default mongoose.model("User", userModel)