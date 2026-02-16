import { Heading } from '@radix-ui/themes'
import LatestIssues from './LatestIssues'
import IssueSumary from './IssueSumary'
import { prisma } from '@/prisma'
import IssueChart from './IssueChart'

export default async function Home({searchParams}: {searchParams: {page: string}}) {
  const open = await  prisma.issue.count({where: {status: 'OPEN'}})
  const inProgress = await  prisma.issue.count({where: {status: 'IN_PROGRESS'}})
  const closed = await  prisma.issue.count({where: {status: 'CLOSED'}})

  return (
   <main>
    <Heading color='green' >Yuzzo The Creator</Heading>
    <IssueChart open={open} inProgress={inProgress} closed={closed}  />
   </main>
  )
}
