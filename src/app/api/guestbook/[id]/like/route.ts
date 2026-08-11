import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface LikeRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: LikeRouteProps) {
  const { id } = await params;

  try {
    const entry = await prisma.guestbookEntry.update({
      where: { id, status: "APPROVED" },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ success: true, entry }, { status: 200 });
  } catch (error) {
    console.error("Guestbook like error:", error);
    return NextResponse.json(
      { error: "Failed to like entry" },
      { status: 500 }
    );
  }
}
