import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server';

export async function POST(
    request : Request
){
    const body = await request.json();
    const {
        email,
        name,
        password
    } = body;


    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);//hash(password,12)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            hashedPassword
        }
    });

    return NextResponse.json(user);
}