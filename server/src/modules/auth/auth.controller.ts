import { Request, Response, NextFunction } from "express";
import { AuthLoginPayload, AuthRegisterPayload, AuthResponse, TokenPayload } from "./auth.types.js";
import { userRepository } from "../user/user.repository.js";
import { ResourceConflict } from "../../errors/ResourceConflictError.js";
import { Role } from "@prisma/client"
import bcrypt from 'bcrypt'
import { generateToken } from "./auth.utils.js";
import ApiResponse from "../../types/apiResponse.types.js";
import { NotFound } from "../../errors/NotFoundError.js";
import { BadRequest } from "../../errors/BadRequestError.js";

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
            payload.phone,
            payload.providerData
        )

        if (!newUser)
            throw new Error('User creation failed')

        const tokenPayload: TokenPayload = {
            sub: newUser.id,
            role: newUser.role
        }

        const token = generateToken(tokenPayload)

        const response: ApiResponse<AuthResponse> = {
            success: true,
            message: 'User registered successfully',
            data: {
                user: newUser,
                token
            }
        }

        res.status(201).json(response)
    } catch(err) {
        next(err)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body as AuthLoginPayload

        const user = await userRepository.getUserByEmailAuth(payload.email)

        if(!user)
            throw new NotFound(`User with email ${payload.email} not found`)

        const passwordsMatch = await bcrypt.compare(payload.password, user.password)

        if(!passwordsMatch)
            throw new BadRequest("Invalid password")

        const {password, ...userWithoutPassword} = user

        const tokenPayload: TokenPayload = {
            sub: user.id,
            role: user.role
        }

        const token = generateToken(tokenPayload)

        const response: ApiResponse<AuthResponse> = {
            success: true,
            message: "User logged in successfully",
            data: {
                user: userWithoutPassword,
                token
            }
        }

        res.status(200).json(response)
    } catch(err) {
        next(err)
    }

}