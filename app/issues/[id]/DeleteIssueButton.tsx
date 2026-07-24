"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (err) {
      setIsDeleting(false);
      setError(true);
      console.error("Failed to delete issue:", err);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            <Flex align="center" gap="2">
              {isDeleting && <Spinner size="sm" />}
              {isDeleting ? "Deleting..." : "Delete Issue"}
            </Flex>
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" disabled={isDeleting}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={deleteIssue} disabled={isDeleting}>
                <Flex align="center" gap="2">
                  {isDeleting && <Spinner size="sm" />}
                  {isDeleting ? "Deleting..." : "Delete Issue"}
                </Flex>
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Failed to delete the issue. Please try again later.
          </AlertDialog.Description>
          <Button
            variant="soft"
            color="gray"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
