import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Issue, Status, Prisma } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  const status =
    searchParams.status &&
    statuses.includes(searchParams.status as Status)
      ? (searchParams.status as Status)
      : undefined;

  const where: Prisma.IssueWhereInput = status
    ? { status }
    : {};

  const orderBy =
    searchParams.orderBy &&
    columnNames.includes(searchParams.orderBy as keyof Issue)
      ? { [searchParams.orderBy]: "asc" as const }
      : undefined;

  const page = parseInt(searchParams.page ?? "1");
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={page}
        itemCount={itemCount}
        pageSize={pageSize}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'Issue Tracker - Issues List',
  description: 'A list of issues in the issue tracker application.',
}

export default IssuesPage;
