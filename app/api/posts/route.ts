// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();
  const newPost = await prisma.post.create({
    data: { title, content },
  });
  return NextResponse.json(newPost, { status: 201 });
}
