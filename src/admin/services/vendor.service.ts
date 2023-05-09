
import { VendorDoc, VendorModel } from "../../vendors/models/vendor.model";
import { VendorRepository } from "../repository/vendor.repository";
import { Serialize } from "../../core/decorators/serialize.decorator";
import { ApiError } from "../../core/exceptions";
import { CreateVendorDto } from "../../core/dto/request";
import { VendorResponseDto  } from "../../core/dto/response";
import { hashPassword } from "../../core/utils";

export class VendorService {
  constructor(private readonly vendorRepository: VendorRepository) {}

  @Serialize(VendorResponseDto)
  async createVendor(vendorDto: CreateVendorDto): Promise<VendorResponseDto>  {
    const { email, password } = vendorDto;
    const isVendorExist = await this.isVendorExist(email);
    
    if (isVendorExist) {
      throw ApiError.BadRequest('Vendor already exist');
    }

    const hashedPassword = await hashPassword(password);
    const createdVendor = await this.vendorRepository.create({
      ...vendorDto,
      password: hashedPassword,
    });

    return createdVendor;
  }

  async findVendor(searchField: string): Promise<VendorDoc>  {
    const vendor = await this.vendorRepository.findOne({ searchField });
    return vendor;
  }

  private async isVendorExist(email: string): Promise<boolean>  {
    const vendor = await this.vendorRepository.findOne({ email });
    return vendor !== null;
  }
}

export const vendorService = new VendorService(new VendorRepository(VendorModel));
