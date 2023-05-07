import { Router, Request, Response, NextFunction } from "express";
import { createVendor, getVendors, getSingleVendor } from "./admin.controller";

const adminRouter = Router();

adminRouter.post('/vendors', createVendor);

adminRouter.get('/vendors', getVendors);

adminRouter.get('/vendors/:id', getSingleVendor);


export default adminRouter;
