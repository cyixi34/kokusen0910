import Image from "next/image";
import { Users, Tv } from "lucide-react";
import qrFanGroup from "../../../public/fans.jpg";
import qrBilibili from "../../../public/bfans.png";

const channels = [
  {
    title: "粉丝群",
    caption: "扫码进群，和告别宣言的乐迷们一起聊天",
    image: qrFanGroup,
    width: 1284,
    height: 2283,
    icon: <Users size={14} />,
    replaceHint: "public/fans.jpg",
  },
  {
    title: "B站账号",
    caption: "扫码关注 B 站账号，获取最新动态与现场视频",
    image: qrBilibili,
    width: 1106,
    height: 1572,
    icon: <Tv size={14} />,
    replaceHint: "public/bfans.png",
  },
];

export function AboutUsSection() {
  return (
    <section id="about-us" className="relative min-h-screen py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-3/10 border border-accent-3/30 text-accent-3 text-xs tracking-[0.2em] font-bold mb-6">
            <Users size={14} />
            ABOUT US
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            关于我们
          </h2>
          <p className="text-sm text-muted-light max-w-md mx-auto">
            加入粉丝群，或关注我们的 B 站账号，不错过每一场告别。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {channels.map((channel) => (
            <div
              key={channel.title}
              className="window-frame p-6 md:p-8 text-center flex flex-col items-center"
            >
              <Image
                src={channel.image}
                alt={`${channel.title}二维码`}
                width={channel.width}
                height={channel.height}
                className="w-52 md:w-60 h-auto rounded-2xl mb-6"
              />
              <h3 className="flex items-center justify-center gap-2 text-lg text-foreground font-black mb-2">
                <span className="text-accent">{channel.icon}</span>
                {channel.title}
              </h3>
              <p className="text-xs text-muted-light leading-relaxed max-w-xs">
                {channel.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
