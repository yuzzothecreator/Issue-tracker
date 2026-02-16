import { Card, Text, Flex } from '@radix-ui/themes'
import React from 'react'
import Link  from 'next/link';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

const IssueSumary = ({ open, inProgress, closed }: Props) => {
    const containers: { label: string; value: number; status: string }[] = [
        { label: 'Open Issues', value: open, status: "OPEN" },
        { label: 'In Progress Issues', value: inProgress, status: "IN_PROGRESS" },
        { label: 'Closed Issues', value: closed, status: "CLOSED" },
    ]
  return (
    <Flex gap="4">
        {containers.map(container => (
            <Card key={container.label}>
                <Flex direction="column" gap="1">
                    <Link 
                    className="text-sm font-medium"
                     href={`/issues/list?status=${container.status}`}>
                        {container.label}
                    </Link>
                    <Text size="5" className='font-bold'>{container.value}</Text>
                </Flex>
            </Card>
        ))}
    </Flex>
  )
}

export default IssueSumary