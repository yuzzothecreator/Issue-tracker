import { Badge } from "@radix-ui/themes";
import React from "react";

export const ISSUE_STATUS = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  CLOSED: "CLOSED",
} as const;

type IssueStatus = keyof typeof ISSUE_STATUS;

const statusMap: Record<
  IssueStatus,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};


const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
};

export default IssueStatusBadge;


