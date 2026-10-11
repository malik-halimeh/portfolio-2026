import { cacheLife } from "next/cache";
import { profile } from "@/data/profile";

export type GitHubStats = {
  contributions: number;
  commits: number;
  source: "live" | "fallback";
  fetchedOn: string;
};

/**
 * Contributions over the last year. The GraphQL calendar needs a token; without one
 * (or on any failure) the last verified figure from data/profile.ts is returned,
 * labelled so the UI can say "cached".
 */
export async function getGitHubStats(): Promise<GitHubStats> {
  "use cache";
  cacheLife("hours");

  const fallback: GitHubStats = {
    contributions: profile.githubFallback.contributionsLastYear,
    commits: profile.githubFallback.commitsLastYear,
    source: "fallback",
    fetchedOn: profile.githubFallback.fetchedOn,
  };

  const token = process.env.GITHUB_TOKEN;
  if (!token) return fallback;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "malik-halimeh-portfolio" },
      body: JSON.stringify({
        query: `query($login:String!){ user(login:$login){ contributionsCollection{ totalCommitContributions contributionCalendar{ totalContributions } } } }`,
        variables: { login: profile.githubLogin },
      }),
    });
    if (!res.ok) return fallback;
    const json = (await res.json()) as {
      data?: { user?: { contributionsCollection?: { totalCommitContributions: number; contributionCalendar: { totalContributions: number } } } };
    };
    const c = json.data?.user?.contributionsCollection;
    if (!c) return fallback;
    return {
      contributions: c.contributionCalendar.totalContributions,
      commits: c.totalCommitContributions,
      source: "live",
      fetchedOn: new Date().toISOString().slice(0, 10),
    };
  } catch {
    return fallback;
  }
}
