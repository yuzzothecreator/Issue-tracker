import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

interface Props {
  params: {
    id: string
  }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
 
  const issueId = Number(params.id)


  if (!Number.isInteger(issueId)) {
    notFound()
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: issueId, 
    },
  })

  if (!issue) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
       <Flex direction="column" gap="4">
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
       </Flex>
      </Box>}
      <Box>
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
