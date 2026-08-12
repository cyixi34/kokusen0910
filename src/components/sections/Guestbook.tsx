import Image from "next/image";
import { MessageSquare } from "lucide-react";
import qrPlaceholder from "../../../public/qanda.png";

export function GuestbookSection() {
  return (
    <section id="guestbook" className="relative min-h-screen py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-3/10 border border-accent-3/30 text-accent-3 text-xs tracking-[0.2em] font-bold mb-6">
            <MessageSquare size={14} />
            GUESTBOOK
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            留言板
          </h2>
          <p className="text-sm text-muted-light max-w-md mx-auto">
            扫码加入我们，留下想对告别宣言说的话。
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="window-frame p-6 md:p-8 max-w-sm w-full">
            <Image
              src={qrPlaceholder}
              alt="留言板二维码"
              width={600}
              height={600}
              priority
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
