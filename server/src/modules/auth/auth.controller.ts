import { Request, Response, NextFunction } from "express";
import { AuthRegisterPayload } from "./auth.types.js";
import { userRepository } from "../user/user.repository.js";
import { ResourceConflict } from "../../errors/ResourceConflictError.js";
import { Role } from "../../generated/enums.js";
import bcrypt from 'bcrypt'
import { generateToken } from "./auth.utils.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as AuthRegisterPayload

        const existingUser = await userRepository.getUserByEmail(payload.email)

        if(existingUser)
            throw new ResourceConflict(`User with email ${payload.email} already existing`)

        const hashedPassword = await bcrypt.hash(payload.password, 10)

        const newUser = await userRepository.createUser(
            payload.email,
            payload.name,
            hashedPassword,
            payload.role as Role,
            payload.phone
        )

        if (!newUser)
            throw new Error("User creation failed")

        console.log(newUser)
    } catch(err) {

    }
}