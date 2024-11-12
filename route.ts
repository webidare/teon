import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const messages = await prisma.message.findMany();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const { recipient, message, loveIntensity } = await request.json();
  const sender = 'sender456'; // Replace with authenticated user's username
  const newMessage = await prisma.message.create({
    data: {
      recipient,
      message,
      loveIntensity,
      sender
    }
  });
  return NextResponse.json(newMessage, { status: 201 });
}
