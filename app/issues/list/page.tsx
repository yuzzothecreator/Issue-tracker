import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import NextLink from 'next/link';
import { IssueStatusBadge, Link } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
  searchParams: {status: Status, orderBy: keyof Issue}
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { value: "title", label: "Issue" },
  { value: "status", label: "Status", className: "hidden md:table-cell" },
  { value: "createdAt", label: "Created", className: "hidden md:table-cell" },
]

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status) 
    ? searchParams.status 
    : undefined;
 
  const issues = await prisma.issue.findMany({
    where: {
      status
    },
  });

  return (
    <div>
      <div className='mb-5'>
        <IssueActions />
      </div>

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: { ...searchParams, orderBy: column.value }
                }}>{column.label}</NextLink>
                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
              </Table.ColumnHeaderCell>
            ))}
           
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue: any) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
