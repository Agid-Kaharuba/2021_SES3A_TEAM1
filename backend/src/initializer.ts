import { Express } from 'express';

export default class ApiInitializer {
  constructor(private app: Express) {
    this.app = app;
  }

  public getApp(): Express {
    return this.app;
  }
}
