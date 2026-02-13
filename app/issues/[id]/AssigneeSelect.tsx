"use client";

import { Select } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = () => {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ["users"],
        queryFn:  () => axios.get<User[]>("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 1 minute
        retry: 3
    });
    
    if (isLoading) return <Skeleton />

    if (error) return null; // Handle error state as needed

  return (
    <Select.Root defaultValue="">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
            {users?.map((user) => (
                 <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                  ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
