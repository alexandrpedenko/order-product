export interface CreateVendorDto {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  foodCategory: [string];
}
