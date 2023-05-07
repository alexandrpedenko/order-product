import { Router, Request, Response, NextFunction } from "express";

const vendorRouter = Router();

vendorRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json('Hello from Vendor')
});

export default vendorRouter;
