"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, MessageSquare, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  status: string;
  likes: number;
  createdAt: string;
}

export function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/guestbook")
      .then((res) => res.json())
      .then((data) => {
        if (data.entries) setEntries(data.entries);
      })
      .catch((err) => console.error("Failed to fetch guestbook:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setFormData({ name: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleLike = async (id: string) => {
    if (likedIds.has(id)) return;

    try {
      const response = await fetch(`/api/guestbook/${id}/like`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to like");

      const data = await response.json();
      setLikedIds((prev) => new Set(prev).add(id));
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, likes: data.entry.likes } : entry
        )
      );
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

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
            留下你想对告别宣言说的话，通过审核后会公开显示在这里。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Entries list */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.2em] text-accent font-bold">
                全部留言 ({entries.length})
              </span>
              <span className="text-xs text-muted">最新在前</span>
            </div>

            {loading ? (
              <div className="window-frame p-8 text-center">
                <Loader2 className="w-6 h-6 text-accent mx-auto animate-spin" />
              </div>
            ) : entries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="window-frame p-8 text-center"
              >
                <MessageSquare className="w-10 h-10 text-accent mx-auto mb-4" />
                <p className="text-muted text-sm">
                  还没有公开留言，成为第一个留言的人吧。
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2">
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 14 }}
                    className="window-frame p-5 hover:border-accent/40 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-foreground font-black flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">
                          {entry.name[0]}
                        </span>
                        {entry.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-dark">
                          {formatDate(entry.createdAt)}
                        </span>
                        <button
                          onClick={() => handleLike(entry.id)}
                          disabled={likedIds.has(entry.id)}
                          className={cn(
                            "flex items-center gap-1 text-xs px-3 py-1 rounded-full transition-all duration-300",
                            likedIds.has(entry.id)
                              ? "bg-accent/20 text-accent scale-105"
                              : "bg-background-soft text-muted hover:bg-accent/20 hover:text-accent"
                          )}
                        >
                          <Heart
                            className={cn(
                              "w-3.5 h-3.5 transition-all duration-300",
                              likedIds.has(entry.id) && "fill-accent"
                            )}
                          />
                          {entry.likes}
                        </button>
                      </div>
                    </div>
                    <p className="text-muted-light text-sm leading-relaxed whitespace-pre-wrap">
                      {entry.message}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 14 }}
            className="window-frame p-6 md:p-8 h-fit lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 mb-6">
              <Send size={18} className="text-accent" />
              <span className="text-sm tracking-[0.15em] text-foreground font-black">
                写下你的留言
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs tracking-[0.15em] text-muted font-bold">
                  昵称
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-background-soft/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted-dark"
                  placeholder="你的名字"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs tracking-[0.15em] text-muted font-bold">
                  留言
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-background-soft/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none placeholder:text-muted-dark"
                  placeholder="写下你想说的话..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full flex items-center justify-center gap-2 accent-gradient text-background-deep px-8 py-4 rounded-xl text-sm tracking-[0.15em] font-black hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 pop-shadow"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    发送中
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    发送留言
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-accent text-sm bg-accent/10 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4" />
                  留言已提交，等待管理员审核后公开显示。
                </div>
              )}

              {status === "error" && (
                <div className="text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-3">
                  发送失败，请稍后再试。
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
