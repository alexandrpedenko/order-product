import { Request, Response, NextFunction } from "express";
import { CreateVendorDto } from "../core/dto/request";
import { ControllerCatch } from "../core/decorators/catch.decorator";
import { vendorService, VendorService } from './services/vendor.service'

@ControllerCatch()
export class AdminController {
  constructor(private readonly vendorService: VendorService) {}

  async createVendor(req: Request, res: Response) {
    const {
      password,
      email,
      name,
      phone,
      address,
      foodCategory,
    } = <CreateVendorDto>req.body;
  
    const vendor = await this.vendorService.createVendor({
      password,
      email,
      name,
      phone,
      address,
      foodCategory,
    });

    return res.status(201).json(vendor);
  };

  async getVendors(req: Request, res: Response, next: NextFunction) {
  
  };
  
  async getSingleVendor(req: Request, res: Response, next: NextFunction) {
    
  };
  
}

export const adminController = new AdminController(vendorService);
