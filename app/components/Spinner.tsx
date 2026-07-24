import classnames from "classnames";

type SpinnerSize = "sm" | "md" | "lg";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-3.5 w-3.5 border-2",
  md: "h-4 w-4 border-2",
  lg: "h-8 w-8 border-[3px]",
};

const Spinner = ({
  size = "md",
  className,
  label = "Loading...",
}: {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}) => {
  return (
    <span
      className={classnames(
        "inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em]",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Spinner;
