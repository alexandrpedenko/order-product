import { Request, Response, NextFunction } from "express";
import { CreateVendorDto } from "src/core/dto";
import { vendorService } from './services/vendor.service'

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
  const {
    password,
    email,
    name,
    phone,
    address,
    foodCategory,
  } = <CreateVendorDto>req.body;

  const vendor = await vendorService.createVendor({
    password,
    email,
    name,
    phone,
    address,
    foodCategory,
  })

  return res.json(vendor);
};

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {
  
};

export const getSingleVendor = async (req: Request, res: Response, next: NextFunction) => {
  
};

