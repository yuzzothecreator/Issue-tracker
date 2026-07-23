import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const statusMap: Record<
  Status,
  { label: string; color: 'red' | 'violet' | 'purple' }
> = {
  OPEN: { label: 'Open', color: 'red' },
  IN_PROGRESS: { label: 'In Progress', color: 'violet' },
  CLOSED: { label: 'Closed', color: 'purple' },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const config = statusMap[status]

  return (
     <Badge color={statusMap[status].color} >
       {statusMap[status].label}
     </Badge>
  )
}

export default IssueStatusBadge
