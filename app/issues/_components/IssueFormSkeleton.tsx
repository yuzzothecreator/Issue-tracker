import { Box } from "@radix-ui/themes";
import { LoadingState, Skeleton } from "@/app/components";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <LoadingState label="Loading form..." />
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
