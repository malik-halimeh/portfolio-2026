import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Container({
  as: Tag = "div",
  className,
  children,
  id,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cx(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
