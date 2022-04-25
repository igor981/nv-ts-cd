import { Router } from "express";
import { vehicleTaxTotal, vehicleTaxDay, vehicleTaxMonth } from "../controller/vehicleController";


const router = Router()


router.get('/vehicle/:id', vehicleTaxTotal)
router.get('/vehicle/:id/:month', vehicleTaxMonth)
router.get('/vehicle/:id/:month/:day', vehicleTaxDay)

export default router