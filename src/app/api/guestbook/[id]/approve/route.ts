import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ApproveRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: ApproveRouteProps) {
  const { id } = await params;

  try {
    const body = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || body.secret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entry = await prisma.guestbookEntry.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    return NextResponse.json({ success: true, entry }, { status: 200 });
  } catch (error) {
    console.error("Guestbook approve error:", error);
    return NextResponse.json(
      { error: "Failed to approve entry" },
      { status: 500 }
    );
  }
}
