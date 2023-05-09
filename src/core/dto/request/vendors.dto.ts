import { IsEmail, IsString } from "class-validator";

export class CreateVendorDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  address: string;
  
  @IsString()
  phone: string;

  @IsString({each: true})
  foodCategory: [string];
}
