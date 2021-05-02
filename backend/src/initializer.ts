import { Express } from "express";

export default class ApiInitializer {
	constructor(private app: Express) {}

	public getApp(): Express {
		return this.app;
  }
}
