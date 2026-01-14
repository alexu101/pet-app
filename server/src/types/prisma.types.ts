export interface PrismaDriverAdapterError {
    cause:{
        originalCode: string,
        originalMessage: string,
        kind: string
        constraint: Record<"fields", string[]>
    }
}