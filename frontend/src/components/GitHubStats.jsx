import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { fadeUp, scaleUp, staggerContainer, staggerChild, viewportMobile } from "../utils/animations";

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

export default function GitHubStats() {
  const username = portfolioData.personal.githubUsername;
  const fallback = useMemo(() => portfolioData.github.fallback, []);
  const [snapshot, setSnapshot] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`,
            { signal: controller.signal },
          ),
          fetch(
            `https://api.github.com/users/${username}/events/public?per_page=30`,
            { signal: controller.signal },
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
          throw new Error("GitHub API unavailable");
        }

        const profile = await profileRes.json();
        const repos = await reposRes.json();
        const events = await eventsRes.json();
        const latestRepo = [...repos].sort(
          (a, b) => new Date(b.pushed_at) - new Date(a.pushed_at),
        )[0];
        const pushEvents = events.filter((event) => event.type === "PushEvent");

        setSnapshot({
          repos: profile.public_repos ?? fallback.repos,
          followers: profile.followers ?? fallback.followers,
          latestActivity: latestRepo
            ? `Latest push: ${latestRepo.name}`
            : fallback.latestActivity,
          language: latestRepo?.language || fallback.language,
          activity: pushEvents
            .slice(0, 7)
            .map((event, index) =>
              Math.min(
                100,
                22 + (event.payload?.commits?.length || 1) * 18 + index * 4,
              ),
            ),
        });
      } catch {
        setSnapshot(fallback);
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [fallback, username]);

  const bars = snapshot.activity?.length
    ? snapshot.activity
    : fallback.activity;

  return (
    <motion.div
      variants={scaleUp}
      custom={0}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMobile}
      className="rounded-2xl border border-white/10 bg-black/20 p-5 text-textPrimary backdrop-blur-sm"
    >
      <motion.div
        variants={staggerContainer(0.08, 0.05)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMobile}
      >
        <motion.div variants={staggerChild} className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-textSecondary">
          <span>GitHub Live Readout</span>
          <span className="text-secondary">{loading ? "syncing" : "online"}</span>
        </motion.div>

        <motion.div variants={staggerChild} className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-textSecondary">Repositories</div>
            <div className="mt-2 text-2xl font-bold text-secondary">{formatNumber(snapshot.repos ?? fallback.repos)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-textSecondary">Followers</div>
            <div className="mt-2 text-2xl font-bold text-highlight">{formatNumber(snapshot.followers ?? fallback.followers)}</div>
          </div>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-[10px] uppercase tracking-[0.25em] text-textSecondary">Latest Activity</div>
          <div className="mt-2 text-sm text-textPrimary">{snapshot.latestActivity || fallback.latestActivity}</div>
          <div className="mt-1 text-[11px] text-textSecondary">Top language: {snapshot.language || fallback.language}</div>
        </motion.div>

        <motion.div variants={staggerChild} className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-textSecondary">
            <span>Contributions</span>
            <span className="text-secondary font-bold">277 this year</span>
          </div>
          <img
            src={`https://ghchart.rshah.org/00ff88/${username}`}
            alt="GitHub contribution graph"
            className="w-full rounded-lg invert"
            style={{ minHeight: "120px" }}
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
