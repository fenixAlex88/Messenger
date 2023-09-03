import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { name, image } = body;
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorize", { status: 401 });
        }

        if (!name || !image) {
            return new NextResponse("Missing info", { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                name,
                image,
            },
        });

        return NextResponse.json(updatedUser);
    } catch (err) {
        console.error(err, "SETTINGS_ERROR");
        return new NextResponse("Internal Error", { status: 500 });
    }
}
