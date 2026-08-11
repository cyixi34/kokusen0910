import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/resend";
import { z } from "zod";

const guestbookSchema = z.object({
  name: z.string().min(1, "请输入昵称").max(50),
  message: z.string().min(1, "请输入留言内容").max(2000),
});

export async function GET() {
  try {
    const entries = await prisma.guestbookEntry.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ entries }, { status: 200 });
  } catch (error) {
    console.error("Guestbook fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch guestbook entries" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = guestbookSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, message } = result.data;

    const entry = await prisma.guestbookEntry.create({
      data: {
        name,
        message,
        status: "PENDING",
      },
    });

    await sendContactEmail({
      name,
      message,
      type: "guestbook",
    }).catch((error) => {
      console.error("Failed to send guestbook email:", error);
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (error) {
    console.error("Guestbook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
