"use client";

import { Status } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { Spinner } from "@/app/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const statuses: { value?: Status; label: string }[] = [
  { label: "All" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return (
    <Flex align="center" gap="2">
      <Select.Root
        defaultValue={searchParams.get("status") || ""}
        disabled={isPending}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) params.append("status", status);
          if (searchParams.get("orderBy")) {
            params.append("orderBy", searchParams.get("orderBy")!);
          }

          const query = params.size ? "?" + params.toString() : "";
          startTransition(() => {
            router.push("/issues/list" + query);
          });
        }}
      >
        {/* @ts-ignore */}
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || ""}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {isPending && <Spinner size="sm" className="text-[var(--accent-9)]" />}
    </Flex>
  );
};

export default IssueStatusFilter;
