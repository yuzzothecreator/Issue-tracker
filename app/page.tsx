import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { Callout, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const dynamic = "force-dynamic";

async function getIssueCounts() {
  try {
    const [open, inProgress, closed] = await Promise.all([
      prisma.issue.count({ where: { status: "OPEN" } }),
      prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
      prisma.issue.count({ where: { status: "CLOSED" } }),
    ]);
    return { open, inProgress, closed, dbError: false as const };
  } catch (error) {
    console.error("Dashboard DB error:", error);
    return { open: 0, inProgress: 0, closed: 0, dbError: true as const };
  }
}

export default async function Home() {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Session error:", error);
  }

  const { open, inProgress, closed, dbError } = await getIssueCounts();
  const total = open + inProgress + closed;
  const greetingName = session?.user?.name?.split(" ")[0] || "there";

  return (
    <Flex direction="column" gap="6">
      {dbError && (
        <Callout.Root color="amber">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            Database is currently unreachable. Check your Railway MySQL service
            and the <code>DATABASE_URL</code> in Vercel environment variables,
            then refresh.
          </Callout.Text>
        </Callout.Root>
      )}

      <Flex
        justify="between"
        align="start"
        direction="column"
        gap="4"
        className="rounded-xl border border-[var(--gray-5)] bg-gradient-to-br from-[var(--accent-2)] to-white p-5 sm:flex-row sm:items-center"
      >
        <Flex direction="column" gap="2">
          <Heading size="7">
            {session
              ? `Welcome back, ${greetingName}`
              : "Issue Tracker Dashboard"}
          </Heading>
          <Text size="3" color="gray">
            {dbError
              ? "Showing offline dashboard until the database reconnects."
              : total === 0
                ? "No issues yet — create one to get started."
                : `Tracking ${total} issue${total === 1 ? "" : "s"} across your project.`}
          </Text>
        </Flex>

        <Flex gap="3" wrap="wrap">
          {session ? (
            <Link
              href="/issues/new"
              className="inline-flex h-10 items-center rounded-md bg-[var(--accent-9)] px-4 text-sm font-medium text-white hover:bg-[var(--accent-10)]"
            >
              New issue
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="inline-flex h-10 items-center rounded-md bg-[var(--accent-9)] px-4 text-sm font-medium text-white hover:bg-[var(--accent-10)]"
            >
              Sign in to continue
            </Link>
          )}
          <Link
            href="/issues/list"
            className="inline-flex h-10 items-center rounded-md bg-[var(--accent-3)] px-4 text-sm font-medium text-[var(--accent-11)] hover:bg-[var(--accent-4)]"
          >
            Browse issues
          </Link>
        </Flex>
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "A clear dashboard to track open, in-progress, and closed issues.",
};
