import { IssueStatusBadge } from "./components";
import { Avatar, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Issue, User } from "@prisma/client";

type IssueWithAssignee = Issue & {
  assignedToUser: User | null;
};

const LatestIssues = ({
  issues,
  dbError = false,
}: {
  issues: IssueWithAssignee[];
  dbError?: boolean;
}) => {
  return (
    <Card className="h-full">
      <Flex justify="between" align="center" mb="4">
        <Heading size="4">Latest issues</Heading>
        <Link
          href="/issues/list"
          className="text-sm text-[var(--accent-11)] hover:underline"
        >
          View all
        </Link>
      </Flex>

      {dbError ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="2"
          className="min-h-[16rem] rounded-md bg-[var(--gray-2)] px-4 text-center"
        >
          <Text weight="medium">Could not load issues</Text>
          <Text size="2" color="gray">
            Database connection failed. Please try again later.
          </Text>
        </Flex>
      ) : issues.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="2"
          className="min-h-[16rem] rounded-md bg-[var(--gray-2)] px-4 text-center"
        >
          <Text weight="medium">No issues yet</Text>
          <Text size="2" color="gray">
            Create your first issue to start tracking work.
          </Text>
          <Link
            href="/issues/new"
            className="mt-2 text-sm font-medium text-[var(--accent-11)] hover:underline"
          >
            New issue →
          </Link>
        </Flex>
      ) : (
        <Table.Root>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between" align="center" gap="3">
                    <Flex direction="column" align="start" gap="2">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="font-medium hover:underline"
                      >
                        {issue.title}
                      </Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUser && (
                      <Avatar
                        src={issue.assignedToUser.image || undefined}
                        fallback={
                          issue.assignedToUser.name?.[0]?.toUpperCase() || "?"
                        }
                        size="2"
                        radius="full"
                        title={issue.assignedToUser.name || "Assignee"}
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Card>
  );
};

export default LatestIssues;
