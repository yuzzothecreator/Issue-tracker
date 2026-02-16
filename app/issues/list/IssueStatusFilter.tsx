"use client";

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation';
import React from 'react'

const statuses: { value?: Status; label: string }[] = [
  { label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
]
const IssueStatusFilter = () => {
    const router = useRouter();

  return (
    <Select.Root onValueChange={(value) => {
        const query = value ? `?status=${value}` : "";
        router.push("/issues/list" + query);
    }}>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || ""}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export default IssueStatusFilter