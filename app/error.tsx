"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      className="min-h-[50vh] text-center"
    >
      <Heading size="6">Something went wrong</Heading>
      <Text color="gray" size="3" className="max-w-md">
        The page failed to load. This is often a database connection issue in
        production. Please try again in a moment.
      </Text>
      {error.digest && (
        <Text size="1" color="gray">
          Digest: {error.digest}
        </Text>
      )}
      <Button size="3" onClick={() => reset()}>
        Try again
      </Button>
    </Flex>
  );
}
