import { Card, Flex } from "@radix-ui/themes";
import { LoadingState } from "@/app/components";

export default function Loading() {
  return (
    <Flex align="center" justify="center" className="min-h-[70vh] py-8">
      <Card size="3" className="w-full max-w-md">
        <LoadingState label="Loading sign in..." />
      </Card>
    </Flex>
  );
}
