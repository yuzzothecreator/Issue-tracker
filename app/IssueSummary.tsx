import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Status } from "@prisma/client";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    tone: string;
    hint: string;
  }[] = [
    {
      label: "Open",
      value: open,
      status: "OPEN",
      tone: "bg-red-50 border-red-100 text-red-700",
      hint: "Needs attention",
    },
    {
      label: "In Progress",
      value: inProgress,
      status: "IN_PROGRESS",
      tone: "bg-violet-50 border-violet-100 text-violet-700",
      hint: "Actively worked",
    },
    {
      label: "Closed",
      value: closed,
      status: "CLOSED",
      tone: "bg-emerald-50 border-emerald-100 text-emerald-700",
      hint: "Resolved",
    },
  ];

  return (
    <Flex gap="4" className="flex-col sm:flex-row">
      {containers.map((container) => (
        <Card key={container.label} className="flex-1 transition hover:shadow-sm">
          <Link href={`/issues/list?status=${container.status}`} className="block">
            <Flex direction="column" gap="2" className="p-1">
              <Flex justify="between" align="center" gap="2">
                <Text size="2" weight="medium" color="gray">
                  {container.label}
                </Text>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${container.tone}`}
                >
                  {container.hint}
                </span>
              </Flex>
              <Text
                size="8"
                weight="bold"
                className="leading-none tracking-tight"
              >
                {container.value}
              </Text>
              <Text size="1" color="gray">
                View {container.label.toLowerCase()} issues →
              </Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
