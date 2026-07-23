import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const IssueForm = nextDynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const dynamic = "force-dynamic";

export default EditIssuePage;
