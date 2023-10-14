import express from "express";
const Router = express.Router();

import { carController } from "../controllers/carController";
import { AuthMiddleware } from "../middlewares/authmid";

Router.get("/cars", AuthMiddleware.isAuthenticated, carController.findAll);
Router.post("/car", AuthMiddleware.isAuthenticated, carController.create);
Router.put("/car/:id", AuthMiddleware.isAuthenticated, carController.update);
Router.delete("/car/:id", AuthMiddleware.isAuthenticated, carController.delete);
Router.get("/car/:id", AuthMiddleware.isAuthenticated, carController.findById);

export { Router };
