import { Request } from "express";
export interface customRequest extends Request {
  currentUser?: any;
}
