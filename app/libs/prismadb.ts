import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | null 
}

const client= globalThis.prisma || new PrismaClient()
if(process.env.NODE_ENV != 'production') globalThis.prisma = client //globalThis prisma is not affected by hot reload

export default client;