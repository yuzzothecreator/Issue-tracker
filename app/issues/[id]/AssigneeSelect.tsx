"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { Issue, User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = ({issue}: { issue: Issue }) => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn:  () => axios.get<User[]>("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 1 minute
        retry: 3
    });
    
    if (isLoading) return <Skeleton />

    if (error) return null; // Handle error state as needed

  return (
    <Select.Root
    defaultValue={issue.assignedToUserId || ""}
     onValueChange={(userId) => {
      axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: userId || null })
    }}  >
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="">Unassigned</Select.Item>
            {users?.map((user) => (
                 <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                  ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
