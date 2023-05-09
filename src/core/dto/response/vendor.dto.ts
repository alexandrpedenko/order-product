import { Expose, Transform } from 'class-transformer';

export class VendorResponseDto {
  @Expose()
  @Transform(params => params.obj._id)
  _id?: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
  
  @Expose()
  address: string;

  @Expose()
  phone: string;

  @Expose()
  foodCategory: [string];
}