import mongoose from "mongoose"

const customerSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },

        city:{
            type: String,
            required: true
        },

        conntype:{
            type: String,
            enum: ["residential", "commercial"],
            required: true
        },

        cunit:{
            type: Number,
            required: true,
        },

        punit:{
            type: Number,
            required: true
        },

        fcharge:{
            type: Number,
            required: true
        }
    }
);

const customer = mongoose.model("Customer", customerSchema);
export default customer;