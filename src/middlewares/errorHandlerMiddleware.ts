import {Request, Response, NextFunction} from "express";

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
  console.log(error);
  if (error) {
    return res.sendStatus(error.status);
  }

  res.sendStatus(500); // internal server error
}