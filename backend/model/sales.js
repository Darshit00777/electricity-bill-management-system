import mongoose from "mongoose"

const salesSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },

        city:{
            type: String,
            required: true
        },

        target:{
            type: Number,
            required: true
        },

        sales:{
            type: Number,
            required: true
        },

        orders:{
            type: Number,
            required: true
        },

        returns:{
            type: Number,
            required: true
        },

        exp:{
            type: Number,
            required: true
        }
    }
);

const sales = mongoose.model("Sales", salesSchema);
export default sales;