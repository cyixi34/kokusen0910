import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RejectRouteProps {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RejectRouteProps) {
  const { id } = await params;

  try {
    const body = await request.json();
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || body.secret !== adminSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entry = await prisma.guestbookEntry.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    return NextResponse.json({ success: true, entry }, { status: 200 });
  } catch (error) {
    console.error("Guestbook reject error:", error);
    return NextResponse.json(
      { error: "Failed to reject entry" },
      { status: 500 }
    );
  }
}
