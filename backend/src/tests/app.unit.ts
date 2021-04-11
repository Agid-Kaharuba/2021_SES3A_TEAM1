// Override database name
process.env.DATABASE_NAME = 'unit-test'

import express from 'express';
import request from "supertest";
import { expect } from "chai";

describe("GET /", () => {
  var server: any;

  beforeEach(() => {
    // We will create a new instance of the server for each test
    server = require("../app");
  });

  afterEach(() => {
    // Make sure to stop the process when not needed
    server.close();
  });

  it(" should be online", function (done) {
    request(server).get("/").expect(200, done);
  });
});