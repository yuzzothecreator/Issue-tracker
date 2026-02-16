import { Flex, Grid } from '@radix-ui/themes'
import LatestIssues from './LatestIssues'
import IssueSumary from './IssueSumary'
import { prisma } from '@/prisma'
import IssueChart from './IssueChart'
import { Metadata } from 'next'


export default async function Home({searchParams}: {searchParams: {page: string}}) {
  const open = await  prisma.issue.count({where: {status: 'OPEN'}})
  const inProgress = await  prisma.issue.count({where: {status: 'IN_PROGRESS'}})
  const closed = await  prisma.issue.count({where: {status: 'CLOSED'}})

  return (
   <main>
    <Grid columns={{initial: "1", md: "2"}} gap="5" >
     <Flex direction="column" gap="5">
       <IssueSumary open={open} inProgress={inProgress} closed={closed} />
       <IssueChart open={open} inProgress={inProgress} closed={closed} />
     </Flex>
     <LatestIssues />
    </Grid>
   </main>
  )
}


export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'A dashboard to track issues in a project management system.',
}