import { cn } from "../lib/utils";

export const LogoIcon = ({
  className,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return <h1 className={cn("", className)}>brainloop</h1>;
};
