import express from "express"
import { createSales, getAll, getCalculate, getAllCalculation, getSummary } from "../controller/salesController.js"

const router = express.Router();

router.post("/createSales", createSales);
router.get("/getAll", getAll);
router.get("/get/:id", getCalculate);
router.get("/getallcal", getAllCalculation);
router.get("/getsummary", getSummary);

export default router;