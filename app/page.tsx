import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

export default function CommitiveLandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Commitive</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#features" className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
              Features
            </a>
            <a href="/signin" className="text-sm bg-violet-600 hover:bg-violet-500 transition-colors px-4 py-1.5 rounded-lg font-medium">
              Sign In
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-16">

        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Badge */}
          <div className="relative mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Built for open-source developers
          </div>

          <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-[1.1]">
            Stop Switching Tabs.{" "}
            <br className="hidden md:block" />
            Start{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Shipping.
            </span>
          </h1>

          <p className="relative text-lg text-white/50 max-w-xl mb-10 leading-relaxed">
            One dashboard for every PR, issue, and repo you care about. No noise, no context switching — just your open-source work, ready to act on.
          </p>

          <div className="relative flex flex-col sm:flex-row gap-3">
            <a
              href="/signin"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
            >
              Start Prioritizing Now
            </a>
            <a
              href="https://github.com/ankurO7/commitive"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-medium transition-all hover:bg-white/5"
            >
              View on GitHub →
            </a>
          </div>

          {/* Mock Dashboard */}
          <div className="relative mt-20 w-full max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="rounded-2xl border border-white/10 bg-[#111118] overflow-hidden shadow-2xl shadow-black/50">
              {/* Window bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#0d0d14]">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <div className="ml-4 flex-1 bg-white/5 rounded-md h-5 max-w-xs text-xs text-white/20 flex items-center px-3">
                  app.commitive.dev/dashboard
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stat cards */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/40 text-xs mb-1">Open PRs</p>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-green-400 text-xs mt-1">↑ 3 this week</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/40 text-xs mb-1">Active Issues</p>
                  <p className="text-2xl font-bold text-white">28</p>
                  <p className="text-yellow-400 text-xs mt-1">5 need review</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-white/40 text-xs mb-1">Repos Tracked</p>
                  <p className="text-2xl font-bold text-white">7</p>
                  <p className="text-violet-400 text-xs mt-1">across 3 orgs</p>
                </div>

                {/* PR list */}
                <div className="md:col-span-2 bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                    <span className="text-sm font-medium text-white/70">Priority PRs</span>
                    <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">12 open</span>
                  </div>
                  {[
                    { title: "feat: add dark mode support", repo: "ui-kit", priority: "high", color: "bg-red-500" },
                    { title: "fix: memory leak in useEffect", repo: "core", priority: "medium", color: "bg-yellow-500" },
                    { title: "docs: update README examples", repo: "commitive", priority: "low", color: "bg-green-500" },
                  ].map((pr, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                      <div className={`w-1.5 h-1.5 rounded-full ${pr.color} flex-shrink-0`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 truncate">{pr.title}</p>
                        <p className="text-xs text-white/30">{pr.repo}</p>
                      </div>
                      <span className="text-xs text-white/30 flex-shrink-0">{pr.priority}</span>
                    </div>
                  ))}
                </div>

                {/* Activity */}
                <div className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <span className="text-sm font-medium text-white/70">Recent Activity</span>
                  </div>
                  {[
                    { text: "PR merged", sub: "2m ago", dot: "bg-green-400" },
                    { text: "Review requested", sub: "1h ago", dot: "bg-violet-400" },
                    { text: "Issue closed", sub: "3h ago", dot: "bg-blue-400" },
                    { text: "New comment", sub: "5h ago", dot: "bg-yellow-400" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 last:border-0">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                      <div>
                        <p className="text-xs text-white/70">{item.text}</p>
                        <p className="text-xs text-white/25">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Built to End Notification Fatigue</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Stop letting maintainer replies slip through the cracks. Everything you need to act on, organized in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⬡",
                title: "Centralized Hub",
                desc: "View all your active repositories, issues, and Pull Requests in one unified dashboard. No more tab hopping.",
                accent: "text-violet-400",
                border: "hover:border-violet-500/30",
                glow: "hover:shadow-violet-500/5",
              },
              {
                icon: "↑",
                title: "Custom Priority",
                desc: "Take control of your workflow. Set custom priorities so the most critical PRs automatically bubble to the top.",
                accent: "text-indigo-400",
                border: "hover:border-indigo-500/30",
                glow: "hover:shadow-indigo-500/5",
              },
              {
                icon: "→",
                title: "One-Click Actions",
                desc: "Jump directly from Commitive to the exact GitHub thread you need. Less searching, more coding.",
                accent: "text-blue-400",
                border: "hover:border-blue-500/30",
                glow: "hover:shadow-blue-500/5",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`group relative p-6 rounded-2xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:bg-white/[0.05] ${f.border} hover:shadow-xl ${f.glow}`}
              >
                <div className={`text-2xl mb-4 ${f.accent} font-bold`}>{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-indigo-900/20 pointer-events-none" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-violet-400 text-sm font-medium uppercase tracking-widest mb-4">Get Started</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Perfect for Open Source Sprints
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Whether you're managing daily contributions or grinding through Hacktoberfest, Commitive keeps your PRs and reviews organized across multiple organizations.
            </p>
            <a
              href="/signin"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 text-lg"
            >
              Get Started for Free
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="text-white/30 text-sm">Commitive</span>
          </div>
          <p className="text-white/20 text-sm">© {new Date().getFullYear()} Commitive. Built for open-source developers.</p>
        </div>
      </footer>
    </div>
  );
}