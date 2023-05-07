import { Application } from 'express';
import vendorRouter from './vendors/vendor.route';
import adminRouter from './admin/admin.route';

export class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });

    this.app.use('/admin', adminRouter);

    this.app.use('/vendors', vendorRouter);
  }
}
