import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Music2 } from "lucide-react";
import { members, band } from "@/content/band";

interface MemberPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return members.map((member) => ({ id: member.id }));
}

export async function generateMetadata({ params }: MemberPageProps) {
  const { id } = await params;
  const member = members.find((m) => m.id === id);
  if (!member) return {};

  return {
    title: `${member.name} | ${band.name}`,
    description: `${member.role} · ${member.description.slice(0, 80)}...`,
  };
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { id } = await params;
  const member = members.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${member.color}30 0%, transparent 55%)`,
        }}
      />

      <header className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-5xl mx-auto bg-background-deep/80 backdrop-blur-xl rounded-full border border-border/60 px-4 h-14 flex items-center justify-between shadow-lg shadow-black/20">
          <Link
            href="/#members"
            className="flex items-center gap-2 text-xs tracking-[0.1em] text-muted hover:text-accent transition-colors font-bold"
          >
            <ArrowLeft size={16} />
            返回成员
          </Link>
          <span className="text-sm font-black tracking-tight text-accent">
            {band.name}
          </span>
          <div className="w-16" />
        </div>
      </header>

      <section className="relative z-10 pt-32 pb-24 md:pt-40 md:pb-32 px-6 min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div
              className="window-frame aspect-[3/4] p-8 md:p-12 flex flex-col justify-between relative overflow-visible"
            >
              <div
                className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl flex items-center justify-center rotate-12 animate-float"
                style={{ backgroundColor: `${member.color}25`, color: member.color, border: `1px solid ${member.color}40` }}
              >
                <Music2 size={28} />
              </div>

              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-[2rem] flex items-center justify-center text-4xl md:text-5xl font-black mx-auto"
                style={{
                  backgroundColor: member.color,
                  color: "#070d18",
                  boxShadow: `0 20px 60px ${member.color}50`,
                }}
              >
                {member.name[0]}
              </div>

              <div className="text-center">
                <p
                  className="text-xs tracking-[0.3em] mb-3 font-black"
                  style={{ color: member.color }}
                >
                  {member.role}
                </p>
                <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight">
                  {member.name}
                </h1>
              </div>
            </div>

            <div className="space-y-8">
              <div className="window-frame p-6 md:p-8">
                <p className="text-xs tracking-[0.3em] text-muted mb-4 font-black">
                  PROFILE
                </p>
                <p className="text-lg md:text-xl text-muted-light leading-relaxed">
                  {member.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "角色", value: member.role },
                  { label: "代表色", value: member.color },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="window-frame p-5 text-center"
                  >
                    <p className="text-xs tracking-[0.2em] text-muted mb-2 font-black">
                      {stat.label}
                    </p>
                    <p className="text-foreground font-black">{stat.value}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/#members"
                className="inline-flex items-center gap-2 text-xs tracking-[0.1em] text-background-deep bg-accent hover:bg-accent-2 transition-colors px-8 py-4 rounded-full font-black pop-shadow"
              >
                <ArrowLeft size={16} />
                返回乐队首页
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
