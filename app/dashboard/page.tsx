import { redirect } from "next/navigation";
import { auth } from "@/auth"; // Ensure this points to your auth.ts file
import { Card, CardHeader, CardBody} from "@heroui/card";
import {Chip }from "@heroui/chip";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

// TypeScript interfaces for the GitHub API response
interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  number: number;
  state: string;
  repository_url: string;
  pull_request?: { url: string }; // If this exists, it's a PR. Otherwise, an issue.
}

export default async function DashboardPage() {
  // 1. Get the authenticated user's session
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signin");
  }

  // @ts-ignore - Assuming , attached accessToken in auth.ts callbacks
  const token = session.accessToken; 

  // 2. Fetching all open issues and PRs created by the user
  // The Search API is perfect for this: "author:@me state:open"
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:@me+state:open&sort=updated&order=desc`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      // Cache strategy: revalidate every 60 seconds so it feels snappy but doesn't hit rate limits
      next: { revalidate: 60 }, 
    }
  );

  if (!res.ok) {
    return <div className="p-8 text-danger">Failed to fetch GitHub data. Please try logging in again.</div>;
  }

  const data = await res.json();
  const items: GitHubIssue[] = data.items || [];

  // 3. Group the issues/PRs by Repository Name
  const groupedData = items.reduce((acc: Record<string, GitHubIssue[]>, item) => {
    // Extract "owner/repo" from "https://api.github.com/repos/owner/repo"
    const repoParts = item.repository_url.split("/");
    const repoName = `${repoParts[repoParts.length - 2]}/${repoParts[repoParts.length - 1]}`;

    if (!acc[repoName]) {
      acc[repoName] = [];
    }
    acc[repoName].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Active Contributions</h1>
          <p className="text-default-500">
            Welcome back, {session.user.name}. Here are your open PRs and Issues.
          </p>
        </div>
        <Button color="primary" variant="flat">Refresh</Button>
      </header>

      {Object.keys(groupedData).length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-divider rounded-xl">
          <p className="text-default-500 text-lg">You don't have any open PRs or issues right now.</p>
          <p className="text-sm mt-2">Time to find a new open-source repository!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedData).map(([repoName, items]) => (
            <Card key={repoName} className="shadow-sm hover:shadow-md transition-shadow border border-divider bg-default-50/50">
              <CardHeader className="bg-default-100/50 border-b border-divider pb-3 pt-4 px-5">
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="font-semibold text-lg text-primary truncate" title={repoName}>
                    {repoName}
                  </h3>
                  <p className="text-xs text-default-500">{items.length} active item(s)</p>
                </div>
              </CardHeader>
              
              <CardBody className="px-5 py-4 gap-4">
                {items.map((item) => {
                  const isPR = !!item.pull_request;
                  return (
                    <div key={item.id} className="flex flex-col gap-2 p-3 rounded-lg bg-background border border-divider hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start gap-2">
                        <Link 
                          href={item.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-foreground hover:text-primary leading-tight line-clamp-2"
                        >
                          {item.title}
                        </Link>
                        <Chip 
                          size="sm" 
                          color={isPR ? "success" : "warning"} 
                          variant="flat"
                          className="min-w-fit"
                        >
                          {isPR ? "PR" : "Issue"}
                        </Chip>
                      </div>
                      <div className="flex justify-between items-center text-xs text-default-400">
                        <span>#{item.number}</span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-success"></span>
                          Open
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}