import { Flex, Text } from "@radix-ui/themes";
import Spinner from "./Spinner";

const LoadingState = ({
  label = "Loading...",
  fullPage = false,
}: {
  label?: string;
  fullPage?: boolean;
}) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="3"
      className={fullPage ? "min-h-[50vh] w-full py-10" : "w-full py-8"}
      role="status"
      aria-live="polite"
    >
      <Spinner size="lg" className="text-[var(--accent-9)]" label={label} />
      <Text size="2" color="gray">
        {label}
      </Text>
    </Flex>
  );
};

export default LoadingState;
