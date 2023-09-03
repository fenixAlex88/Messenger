import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const currenrUser = await getCurrentUser();
        const body = await request.json();
        const { userId, isGroup, members, name } = body;
        if (!currenrUser?.id || !currenrUser?.email) {
            return new NextResponse("Unauthorize", { status: 401 });
        }
        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("Invalid data", { status: 400 });
        }
        if (isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value,
                            })),
                            {
                                id: currenrUser.id,
                            },
                        ],
                    },
                },
                include: {
                    users: true,
                },
            });
            return NextResponse.json(newConversation);
        }
        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currenrUser.id, userId],
                        },
                    },
                    {
                        userIds: {
                            equals: [userId, currenrUser.id],
                        },
                    },
                ],
            },
        });
        const singleConversation = existingConversations[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currenrUser.id,
                        },
                        {
                            id: userId,
                        },
                    ],
                },
            },
            include: {
                users: true,
            },
        });
        return NextResponse.json(newConversation);
    } catch (error) {
        console.log(error, " MESSAGE_SEEN_ERROR");
        return new NextResponse("Internal error", { status: 500 });
    }
}
