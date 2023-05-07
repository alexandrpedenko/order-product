import { Model } from "mongoose";
import { EntityRepository } from "../../core/database/entity.repository";

import { VendorDoc } from "../../vendors/models/vendor.model";

export class VendorRepository extends EntityRepository<VendorDoc> {
  constructor(vendor: Model<VendorDoc>) {
    super(vendor);
  }
}
