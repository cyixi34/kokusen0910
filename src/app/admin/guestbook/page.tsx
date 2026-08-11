"use client";

import { useState } from "react";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  likes: number;
  createdAt: string;
}

export default function AdminGuestbookPage() {
  const [secret, setSecret] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setEntries(data.entries);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, action: "approve" | "reject") => {
    try {
      const res = await fetch(`/api/guestbook/${id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });

      if (!res.ok) throw new Error("Failed");

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === id
            ? {
                ...entry,
                status: action === "approve" ? "APPROVED" : "REJECTED",
              }
            : entry
        )
      );
    } catch {
      setError(`Failed to ${action} entry`);
    }
  };

  const pending = entries.filter((e) => e.status === "PENDING");
  const approved = entries.filter((e) => e.status === "APPROVED");
  const rejected = entries.filter((e) => e.status === "REJECTED");

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="window-frame p-6 md:p-8 mb-8">
          <h1 className="text-2xl md:text-3xl font-black accent-gradient-text mb-2">
            留言板管理后台
          </h1>
          <p className="text-sm text-muted">审核和管理所有留言内容</p>
        </div>

        <div className="window-frame p-4 md:p-6 mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="输入管理员密钥"
            className="flex-1 bg-background-soft/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-muted"
          />
          <button
            onClick={fetchEntries}
            disabled={loading}
            className="px-8 py-3 rounded-xl accent-gradient text-background-deep font-black hover:opacity-90 transition-opacity disabled:opacity-50 pop-shadow"
          >
            {loading ? "加载中..." : "加载留言"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500 text-red-400 bg-red-500/10">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <Section title="待审核" count={pending.length} color="text-yellow-400">
            {pending.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onApprove={() => updateStatus(entry.id, "approve")}
                onReject={() => updateStatus(entry.id, "reject")}
              />
            ))}
          </Section>

          <Section title="已公开" count={approved.length} color="text-accent">
            {approved.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onReject={() => updateStatus(entry.id, "reject")}
              />
            ))}
          </Section>

          <Section title="已拒绝" count={rejected.length} color="text-muted">
            {rejected.map((entry) => (
              <EntryCard
                key={entry.id}
                entry={entry}
                onApprove={() => updateStatus(entry.id, "approve")}
              />
            ))}
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({
  title,
  count,
  color,
  children,
}: {
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className={`text-lg font-black mb-4 ${color}`}>
        {title} <span className="text-sm text-muted font-bold ml-2">({count})</span>
      </h2>
      {count === 0 ? (
        <div className="window-frame p-6 text-center text-muted text-sm">
          暂无{title}留言
        </div>
      ) : (
        <div className="space-y-4">{children}</div>
      )}
    </section>
  );
}

function EntryCard({
  entry,
  onApprove,
  onReject,
}: {
  entry: GuestbookEntry;
  onApprove?: () => void;
  onReject?: () => void;
}) {
  const statusColors = {
    PENDING: "text-yellow-400",
    APPROVED: "text-accent",
    REJECTED: "text-muted",
  };

  return (
    <div className="window-frame p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-black text-foreground flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs">
            {entry.name[0]}
          </span>
          {entry.name}
        </span>
        <div className="flex items-center gap-4">
          <span className={`text-xs ${statusColors[entry.status]} font-bold`}>
            {entry.status}
          </span>
          <span className="text-xs text-muted">👍 {entry.likes}</span>
        </div>
      </div>
      <p className="text-muted-light text-sm leading-relaxed mb-4">
        {entry.message}
      </p>
      <div className="flex gap-3">
        {onApprove && (
          <button
            onClick={onApprove}
            className="px-5 py-2 text-xs rounded-xl accent-gradient text-background-deep font-black hover:opacity-90 transition-opacity"
          >
            通过
          </button>
        )}
        {onReject && (
          <button
            onClick={onReject}
            className="px-5 py-2 text-xs rounded-xl border border-border bg-background-soft text-muted hover:text-foreground hover:border-foreground transition-colors"
          >
            拒绝
          </button>
        )}
      </div>
    </div>
  );
}
