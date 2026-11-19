import { Result } from "express-validator";
import customer from "../model/customer.js";

export const createCustomer = async(req,res) => {
    try{
        const result = await customer.create(req.body);

        res.json({
            message : "Add customer",
            data: result
        });
    }
    catch(error){
        res.json({
            message : error.message
        });
    }
}

export const getAll = async(req, res) => {
    try{
        const result = await customer.find();

        res.json({
            message : "all records",
            data : result
        });
    }
    catch(error){
        res.json({
            message : error.message
        });
    }
}

export const getBillById = async(req,res) => {
    try{
        const result = await customer.findById(req.params.id);

        const unitCon = result.cunit - result.punit;

        let rate = 0;
        if(unitCon <= 100 ){
            rate = 3;
        }
        else if(unitCon >= 101 && unitCon <= 200){
            rate = 5;
        }
        else if(unitCon >= 201 && unitCon <=400){
            rate = 7;
        }
        else{
            rate = 10
        }

        const echarge = unitCon * rate;

        const subtotal = echarge + result.fcharge;

        const tax = (subtotal * 5) / 100;

        const finalbill = subtotal + tax;

        res.json({
            message : "Final Bill",
            data: result,
            UnitConsumed : unitCon,
            energyCharge : echarge,
            subtotal : subtotal,
            tax : tax,
            finalbill : finalbill
        });
    }
    catch(error){
        res.json({
            message : error.message
        });
    }
}

export const getBillByAll = async(req,res)  => {
    try{
        const result = await customer.find();

        const customers = result.map((m) => {
            const unitCon =  m.cunit - m.punit;

            let rate = 0;
            if(unitCon <= 100 ){
                rate = 3;
            }
            else if(unitCon >= 101 && unitCon <= 200){
                rate = 5;
            }
            else if(unitCon >= 201 && unitCon <=400){
                rate = 7;
            }
            else{
                rate = 10
            }

            const echarge = unitCon * rate;

            const subtotal = echarge + m.fcharge;

            const tax = (subtotal * 5) / 100;

            const finalbill = subtotal + tax;

            return{
                name: m.name,
                city : m.city,
                conntype : m.conntype,
                unitCon : unitCon,
                echarge : echarge,
                fcharge : m.fcharge,
                subtotal : subtotal,
                tax : tax,
                finalbill : finalbill
            }
        });

        res.json({
            message : "all data",
            data: customers
        });

    }
    catch(error){
        res.json({
            message : error.message
        });
    }
}

export const getSummary = async(req,res) => {
    try{
        const result = await customer.aggregate([
            {
                $project:{
                    unitCon:{
                        $subtract: ["$cunit", "$punit"]
                    }
                }
            }, 
            {
                $group:{
                    _id: null,
                    totalCust : {$sum: 1},
                    totalUnit : {$sum: "$unitCon"},
                    avgUnit : {$avg: "$unitCon"},
                    minUnit : {$min: "$unitCon"},
                    maxUnit : {$max: "$unitCon"}
                }
            }
        ]);

        res.json({
            message : "summary",
            data: result
        });
    }
    catch(error){
        res.json({
            message : error.message
        });
    }
}

export const getCityData = async(req,res) => {
    try{
        const result = await customer.aggregate([
            {
                $group:{
                    _id:"$city",
                    totalUnit:{
                        $sum:{
                            $subtract:["$cunit", "$punit"]
                        }
                    }
                }
            }
        ]);

        res.json({
            message: "city data",
            data: result
        });
    }
    catch(error){
        res.json({
            message : error.message
        });
    }
}