import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"

export const validate = <T extends z.ZodType>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const parsed = schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            }) as any

            if (parsed.body) req.body = parsed.body
            if (parsed.params) req.params = parsed.params
            if (parsed.query) req.queryParams = parsed.query

            next()
        } catch (err) {
            if (err instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: err.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                })
            }
            next(err)
        }
    }
}