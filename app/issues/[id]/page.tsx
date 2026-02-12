import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

interface Props {
  params: {
    id: string
  }
}

const IssueDetailsPage = async ({ params }: Props) => {
 
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

  await delay(1000)

  return (
    <Grid columns={{ initial: '1', lg: '2' }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  )
}

export default IssueDetailsPage
