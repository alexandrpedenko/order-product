import { Router } from "express";
import { adminController } from "./admin.controller";
import { validateBodyRequestMiddleware } from '../core/middlewares/validate-body-request.middleware'
import { CreateVendorDto } from "../core/dto/request";

const adminRouter = Router();

adminRouter.post(
  '/vendors', 
  validateBodyRequestMiddleware(CreateVendorDto),
  adminController.createVendor.bind(adminController)
);

adminRouter.get('/vendors', adminController.getVendors.bind(adminController));

adminRouter.get('/vendors/:id', adminController.getSingleVendor.bind(adminController));

export default adminRouter;
