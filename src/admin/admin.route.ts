import { Router, Request, Response, NextFunction } from "express";
import { createVendor } from "./admin.controller";

const adminRouter = Router();

adminRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('Hello from Admin')
});

adminRouter.post('/vendor', createVendor);


export default adminRouter;
