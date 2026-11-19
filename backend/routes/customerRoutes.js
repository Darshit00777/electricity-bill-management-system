import express from "express"
import { createCustomer, getAll, getBillById, getBillByAll, getSummary, getCityData } from "../controller/customerController.js"

const router = express.Router();

router.post("/createCustomer", createCustomer);
router.get("/getAll", getAll);
router.get("/getBillById/:id", getBillById);
router.get("/getBillByAll", getBillByAll);
router.get("/getSummary", getSummary);
router.get("/cityData", getCityData);

export default router;