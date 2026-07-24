"use client";

import { Spinner } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Flex, Select, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();
  const [isSaving, setIsSaving] = useState(false);

  if (isLoading) {
    return (
      <Flex align="center" gap="2" className="h-8">
        <Spinner size="sm" className="text-[var(--accent-9)]" />
        <Text size="1" color="gray">
          Loading assignees...
        </Text>
      </Flex>
    );
  }

  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      setIsSaving(true);
      await axios.patch("/api/issues/" + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success("Assignee updated");
    } catch {
      toast.error("Changes could not be saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Flex align="center" gap="2">
        <Select.Root
          defaultValue={issue.assignedToUserId || "unassigned"}
          onValueChange={assignIssue}
          disabled={isSaving}
        >
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="unassigned">Unassigned</Select.Item>
              {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        {isSaving && <Spinner size="sm" className="text-[var(--accent-9)]" />}
      </Flex>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
