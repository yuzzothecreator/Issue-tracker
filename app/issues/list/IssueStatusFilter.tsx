"use client";

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const statuses: { value?: Status; label: string }[] = [
  { label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
]
const IssueStatusFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

  return (
    <Select.Root
    defaultValue={searchParams.get('status') || ''}
    onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (searchParams.get('orderBy'))
             params.append('orderBy', searchParams.get('orderBy')!);

        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list" + query);
    }}>
      {/* @ts-ignore */}
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