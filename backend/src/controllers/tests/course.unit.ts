import { expect } from "chai";
import httpMocks from "node-mocks-http";
import sinon from "sinon";
import CourseController from "../course"
import request from "supertest";

describe("Course controller", () => {
    var server: any;
    var courseId: any;
  
    beforeEach(() => {
      server = require("../../app");
    });
  
    afterEach(() => {
      server.close();
    });


    it("should create a course", async function () {
      const course = {
        name: "Test",
        description: "this is some text"
      }
      const { body } = await request(server).post("/course").send(course);
      courseId = body._id;
    });

    it("should get all courses", async function () {
      const course = {
        name: "Another test",
        description: "this is some text"
      }
      await request(server).post("/course").send(course);

      const { body } = await request(server).get("/course").send();
      expect(body.length).to.equal(2);
      expect(body[0]._id).to.equal(courseId);
    });

    it("should get a course", async function () {
      const { body } = await request(server).get(`/course/${courseId}`).send();
      expect(body.name).to.equal("Test");
      expect(body._id).to.equal(courseId);
    });

    it("should update a course", async function () {
      const course = {
        name: "Another test",
        description: "this is some text"
      }

      const response = await request(server).put(`/course/${courseId}`).send(course);
      expect(response.status).to.equal(200);
      const { body } = await request(server).get(`/course/${courseId}`).send();
      expect(body.name).to.equal(course.name);
      expect(body.description).to.equal(course.description);
    });

    it("should delete a course", async function () {
      const course = {
        name: "Another test",
        description: "this is some text"
      }

      const response = await request(server).delete(`/course/${courseId}`).send();
      expect(response.status).to.equal(200);
      const { body } = await request(server).get("/course").send();
      expect(body.length).to.equal(1);
      expect(body[0]._id).to.not.equal(courseId);
    });
});