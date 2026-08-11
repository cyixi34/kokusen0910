import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactEmail } from "@/lib/resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "请输入姓名").max(50),
  email: z.string().email("请输入有效的邮箱").max(100),
  subject: z.string().max(200).optional(),
  message: z.string().min(1, "请输入消息内容").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    const entry = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    await sendContactEmail({
      name,
      email,
      subject,
      message,
      type: "contact",
    }).catch((error) => {
      console.error("Failed to send contact email:", error);
    });

    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
