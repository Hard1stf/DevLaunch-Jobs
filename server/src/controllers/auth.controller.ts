import type { Response, Request, NextFunction } from 'express';
import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";

export const register = async (req:Request, res: Response, next: NextFunction) => {
    try {
        const result = registerSchema.safeParse(req.body);
        
        if(!result.success) {
            throw new APIError(
                400,
                result.error.issues[0]?.message ?? 'Invalid request data',
            );
        };

        const user = await registerUser(result.data);

        res.status(201).json(
            new APIResponse(user, 'User register successfully')
        );

    } catch (error) {
        next(error);
    }
};