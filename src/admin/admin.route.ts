import { Router, Request, Response, NextFunction } from "express";
import { adminController } from "./admin.controller";

const adminRouter = Router();

adminRouter.post('/vendors', adminController.createVendor.bind(adminController));

adminRouter.get('/vendors', adminController.getVendors.bind(adminController));

adminRouter.get('/vendors/:id', adminController.getSingleVendor.bind(adminController));


export default adminRouter;
