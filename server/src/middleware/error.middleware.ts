import { ErrorRequestHandler } from "express";
import { APIError } from "../utils/APIError.js";

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);

    if(err instanceof APIError){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    
    res.status(500).json({success: false, message: 'Internal server error'});
};

export default errorMiddleware;