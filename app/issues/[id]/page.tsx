import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
  params: {
    id: string
  }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: {id: issueId,}}))


const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
 
  const issueId = Number(params.id)
  if (!Number.isInteger(issueId)) {
    notFound()
  }

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
       <Flex direction="column" gap="4">
        <AssigneeSelect issue={issue} />
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
       </Flex>
      </Box>}
      <Box>
      </Box>
    </Grid>
  )
}

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  if (!issue) {
    return {
      title: 'Issue Not Found',
      description: 'The requested issue was not found.',
    }
  }

  return {
    title: `Issue Tracker - ${issue.title}`,
    description: `Details for issue "${issue.id}: ${issue.title}" in the issue tracker application.`,
  }
}

export default IssueDetailsPage
