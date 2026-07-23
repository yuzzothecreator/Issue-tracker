"use client";

import { Card, Heading, Text } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open, fill: "#e5484d" },
    { label: "In Progress", value: inProgress, fill: "#ab4aba" },
    { label: "Closed", value: closed, fill: "#8e4ec6" },
  ];

  const total = open + inProgress + closed;

  return (
    <Card>
      <Heading size="4" mb="1">
        Issue overview
      </Heading>
      <Text size="2" color="gray" mb="4" as="p">
        Distribution across {total} total issue{total === 1 ? "" : "s"}
      </Text>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barCategoryGap="28%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#71717a", fontSize: 12 }}
            width={28}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e4e4e7",
              boxShadow: "none",
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={72}>
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
