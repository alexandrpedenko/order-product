import { Schema, Document, SchemaTypes, model } from "mongoose";

interface VendorDoc extends Document {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  foodCategory: [string];
  rating: number;
  foods: [string];
  isAvailable: boolean;
  images: [string]
};

const VendorSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    foods: { type: String },
    rating: { type: Number },
    images: { type: [String]},
    isAvailable: { type: Boolean },
    // foodCategory: [{
    //   type: SchemaTypes.ObjectId,
    //   ref: 'food'
    // }],
  },
  { 
    timestamps: true 
  }
);

const VendorModel = model<VendorDoc>('vendor', VendorSchema);

export { VendorModel, VendorDoc }
