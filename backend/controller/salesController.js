import sales from "../model/sales.js";

export const createSales = async(req,res) => {
    try{
        const result = await sales.create(req.body);

        res.json({
            message: "add",
            data: result
        });
    }
    catch(error){
        res.json({
            message: error.message 
        });
    }
}

export const getAll = async(req,res) => {
    try{
        const result = await sales.find();

        res.json({
            message : "get all",
            data: result
        });
    }
    catch(error){
        res.json({
            message: error.message 
        });
    }
}

export const getCalculate = async(req,res) => {
    try{
        const result = await sales.findById(req.params.id);

        const achiv = (result.sales / result.target) * 100;
        
        const rRate = (result.returns / result.orders) * 100;

        let inc = 0;
        if(achiv < 80){
            inc = (0 * result.sales) / 100;
        }
        else if(achiv < 100){
            inc = (2 * result.sales) / 100;
        }
        else if(achiv < 120){
            inc = (5 * result.sales) / 100;
        }
        else{
            inc = (8 * result.sales) / 100;
        }

        let rating = "";
        if(achiv > 120){
            rating = "Excellent";
        }
        else if(achiv > 100){
            rating = "very good";
        }
        else if(achiv > 80){
            rating = "good"
        }
        else{
            rating = "need improvement"
        }

        res.json({
            message : "data",
            data: result,
            achiv : achiv,
            rRate : rRate,
            inc : inc,
            rating : rating
        });

    }
    catch(error){
       res.json({
            message: error.message 
        }); 
    }
}

export const getAllCalculation = async(req,res) => {
    try{
        const sale = await sales.find();
        
        const result = sale.map((s) => {

        const achiv = (s.sales / s.target) * 100;
        
        const rRate = (s.returns / s.orders) * 100;

        let inc = 0;
        if(achiv < 80){
            inc = (0 * s.sales) / 100;
        }
        else if(achiv < 100){
            inc = (2 * s.sales) / 100;
        }
        else if(achiv < 120){
            inc = (5 * s.sales) / 100;
        }
        else{
            inc = (8 * s.sales) / 100;
        }

        let rating = "";
        if(achiv > 120){
            rating = "Excellent";
        }
        else if(achiv > 100){
            rating = "very good";
        }
        else if(achiv > 80){
            rating = "good"
        }
        else{
            rating = "need improvement"
        }

        return{
            name : s.name,
            city : s.city,
            target : s.target,
            sales : s.sales,
            achiv : achiv,
            orders : s.orders,
            returns : s.returns,
            rRate : rRate,
            inc : inc,
            rating : rating
        }
        });

        res.json({
            message : "all data",
            data: result
        })
    }
    catch(error){
       res.json({
            message: error.message 
        }); 
    }
}

export const getSummary = async(req,res) => {
    try{
        const result = await sales.aggregate([
            {
                $group:{
                    _id: null,
                    totalSale : {$sum : "$sales"},
                    avgSale : {$avg : "$sales"},
                    highestSale : {$max : "$sales"},
                    totalOrder : {$sum : "$orders"},
                    totalReturn : {$sum : "$returns"},
                    avgAch : {
                        $avg: {
                            $multiply : [
                            {  
                                $divide : ["$sales", "$target"] 
                            }, 100
                            ]
                        }
                    }
                }
            }
        ]);

        const result2 = await sales.aggregate([
            {
                $group:{
                    _id: "$city",
                    totalSal : {$sum : "$sales"}
                }
            }
        ]);

        res.json({
            message : "data",
            data: result,
            data2 : result2
        });
    }
    catch(error){
       res.json({
            message: error.message 
        }); 
    }
}