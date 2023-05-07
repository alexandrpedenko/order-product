import { CreateVendorDto } from "../../core/dto";
import { VendorRepository } from "../repository/vendor.repository";
import { VendorDoc, VendorModel } from "../../vendors/models/vendor.model";


export const vendorService = {
  vendorRepository: new VendorRepository(VendorModel),

  createVendor: async function(vendorDto: CreateVendorDto): Promise<VendorDoc>  {
    const vendor = await this.vendorRepository.create(vendorDto);
    return vendor;
  },

  
}
