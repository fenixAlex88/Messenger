import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return new NextResponse('Missing info', { status: 400 });
        }

        const hachedPassword = await bcrypt.hash(password, 7);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hachedPassword
            }
        });

        return NextResponse.json(user);
    } catch (err) {
        console.error(err, 'REGISTRATION_ERROR');
        return new NextResponse('Internal Error', { status: 500 });
    }

}