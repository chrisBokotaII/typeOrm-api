import { NextFunction, Response } from "express";
import { customRequest } from "../interfaces/request.interface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWT_SECRET = "" } = process.env;

export class AuthMiddleware {
  static async isAuthenticated(
    req: customRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      // Check if the authorization header is valid
      if (!req.headers.authorization) {
        return res.status(401).json({ error: "Access denied" });
      }
      // Extract the token from the authorization header
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Access denied" });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      // Store the decoded user information in the request object
      req.currentUser = decoded;

      next();
    } catch (error) {
      // Handle JWT verification errors more gracefully
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}
