import { redirect } from "next/navigation";
import { auth } from "@/auth";
import RefreshButton from "@/components/Refresh";

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  number: number;
  state: string;
  repository_url: string;
  pull_request?: { url: string };
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  // @ts-ignore
  const token = session.accessToken;

  const res = await fetch(
    `https://api.github.com/search/issues?q=author:@me+state:open&sort=updated&order=desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg font-medium">Failed to fetch GitHub data.</p>
          <p className="text-white/30 text-sm mt-2">Please try logging in again.</p>
          <a href="/signin" className="inline-block mt-4 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors">
            Sign in again
          </a>
        </div>
      </div>
    );
  }

  const data = await res.json();
  const items: GitHubIssue[] = data.items || [];

  const groupedData = items.reduce((acc: Record<string, GitHubIssue[]>, item) => {
    const repoParts = item.repository_url.split("/");
    const repoName = `${repoParts[repoParts.length - 2]}/${repoParts[repoParts.length - 1]}`;
    if (!acc[repoName]) acc[repoName] = [];
    acc[repoName].push(item);
    return acc;
  }, {});

  const totalPRs = items.filter((i) => !!i.pull_request).length;
  const totalIssues = items.filter((i) => !i.pull_request).length;
  const totalRepos = Object.keys(groupedData).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md bg-[#0a0a0f]/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white font-bold text-xs">C</span>
            </div>
            <span className="font-semibold text-base tracking-tight">Commitive</span>
          </a>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name ?? "User"}
                  className="w-7 h-7 rounded-full border border-white/10"
                />
              )}
              <span className="text-white/50 text-sm hidden sm:block">{session.user.name}</span>
            </div>
            <RefreshButton />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Your Active Contributions</h1>
          <p className="text-white/40 text-sm">
            Welcome back, {session.user.name?.split(" ")[0]}. Here are your open PRs and Issues.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Open PRs", value: totalPRs, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
            { label: "Open Issues", value: totalIssues, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
            { label: "Repos Tracked", value: totalRepos, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl border ${stat.border} ${stat.bg} p-4`}>
              <p className="text-white/40 text-xs mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {Object.keys(groupedData).length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-white/40 text-base font-medium">No open PRs or Issues right now.</p>
            <p className="text-white/20 text-sm mt-1">Time to find a new open-source repo!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(groupedData).map(([repoName, repoItems]) => {
              const prCount = repoItems.filter((i) => !!i.pull_request).length;
              const issueCount = repoItems.filter((i) => !i.pull_request).length;
              const [org, repo] = repoName.split("/");

              return (
                <div
                  key={repoName}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-200 overflow-hidden flex flex-col"
                >
                  {/* Card header */}
                  <div className="px-5 py-4 border-b border-white/5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="text-white/30 text-xs truncate">{org}/</p>
                        <h3 className="font-semibold text-white truncate" title={repoName}>
                          {repo}
                        </h3>
                      </div>
                      <span className="flex-shrink-0 text-xs text-white/30 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">
                        {repoItems.length} open
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {prCount > 0 && (
                        <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2 py-0.5">
                          {prCount} PR{prCount > 1 ? "s" : ""}
                        </span>
                      )}
                      {issueCount > 0 && (
                        <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-2 py-0.5">
                          {issueCount} Issue{issueCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col divide-y divide-white/5 flex-1">
                    {repoItems.map((item) => {
                      const isPR = !!item.pull_request;
                      return (
                        <a
                          key={item.id}
                          href={item.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/5 transition-colors group"
                        >
                          {/* PR / Issue icon */}
                          <div className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${
                            isPR
                              ? "border-green-500/50 bg-green-500/10"
                              : "border-yellow-500/50 bg-yellow-500/10"
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isPR ? "bg-green-400" : "bg-yellow-400"}`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white/70 group-hover:text-white transition-colors leading-snug line-clamp-2">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-white/25">#{item.number}</span>
                              <span className={`text-xs font-medium ${isPR ? "text-green-400/70" : "text-yellow-400/70"}`}>
                                {isPR ? "Pull Request" : "Issue"}
                              </span>
                            </div>
                          </div>

                          {/* Arrow */}
                          <svg className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 flex-shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}