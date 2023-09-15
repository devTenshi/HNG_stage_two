import express, { Request, Response } from "express";
import request from "supertest";
import app from "../index";
import logger from "../utils/logger";

describe("Post Endpoints", () => {
  it("should create a new person", async () => {
    try {
      const res = await request(app).post("/api").send({
        Name: "George Angel",
        email: "geoang222@gmail.com",
        phoneNumber: "+2345678923",
        age: 24,
      });

  

      // Assert that the response body contains a "data" property
      expect(res.body).toHaveProperty("data");
    } catch (error) {
      logger.error(error);
      throw error; // Rethrow the error to fail the test
    }
  });
});

describe("Put Endpoints", () => {
  it("should update a new person", async () => {
    try {
      const res = await request(app).put("/api/650494ecfb2e6af7aec40515").send({
        age: 30,
      });

      // Assert the response status code
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    } catch (error) {
      logger.error(error);
      throw error; // Rethrow the error to fail the test
    }
  });
});

describe("get Endpoints", () => {
  it("should get a person record", async () => {
    try {
      const res = await request(app).get("/api/650494ecfb2e6af7aec40515");
      // Assert the response status code
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    } catch (error) {
      logger.error(error);
      throw error; // Rethrow the error to fail the test
    }
  });
});

describe("delete Endpoints", () => {
  it("should delete a person record", async () => {
    try {
      const res = await request(app).delete("/api/650494ecfb2e6af7aec40515");
      // Assert the response status code
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    } catch (error) {
      logger.error(error);
      throw error; // Rethrow the error to fail the test
    }
  });
});
