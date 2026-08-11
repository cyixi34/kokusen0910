import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const toEmail = process.env.RESEND_TO_EMAIL;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendContactEmail(data: {
  name: string;
  email?: string;
  subject?: string;
  message: string;
  type: "guestbook" | "contact";
}) {
  if (!resend || !toEmail) {
    console.warn("Resend not configured, skipping email notification");
    return;
  }

  const subject =
    data.type === "guestbook"
      ? `【告别宣言】新留言来自 ${data.name}`
      : data.subject || `【告别宣言】新联系消息来自 ${data.name}`;

  const emailLine = data.email ? `\n邮箱：${data.email}` : "";

  await resend.emails.send({
    from: "告别宣言 <onboarding@resend.dev>",
    to: toEmail,
    subject,
    text: `姓名：${data.name}${emailLine}\n主题：${data.subject || "无"}\n类型：${data.type === "guestbook" ? "留言板" : "联系表单"}\n\n内容：\n${data.message}`,
  });
}
