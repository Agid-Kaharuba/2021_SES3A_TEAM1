// Override database name
process.env.DATABASE_NAME = 'unit-test'

import express from 'express';
import request from "supertest";
import { expect } from "chai";
import mongoose from "mongoose";
import Course from "../model/course";
import Recipe from "../model/recipe";
import Step from "../model/step";
import User from "../model/user";

describe("Prepare Unit Test", () => {
  var server: any;

  beforeEach(() => {
    // We will create a new instance of the server for each test
    server = require("../app");
  });

  afterEach(() => {
    // Make sure to stop the process when not needed
    server.close();
  });

  it("should empty Course", async function () {
    await Course.deleteMany({});
  });
  it("should empty Recipe", async function () {
    await Recipe.deleteMany({});
  });
  it("should empty Step", async function () {
    await Step.deleteMany({});
  });
  it("should empty User", async function () {
    await User.deleteMany({});
  });
});