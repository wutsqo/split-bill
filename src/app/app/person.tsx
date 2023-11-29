import { FC } from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";
import { mergeClassname } from "@/utils/common";

interface PersonLabelProps {
  name?: string;
  size?: "sm" | "md" | "lg";
  suffix?: string;
  prefix?: string;
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};

export const PersonLabel: FC<PersonLabelProps> = ({
  name = "Deleted Person",
  size = "md",
  suffix = "",
  prefix = "",
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={createAvatar(funEmoji, {
          seed: name,
        }).toDataUriSync()}
        alt={name}
        className={mergeClassname("mask mask-squircle", sizeMap[size])}
      />
      {prefix} {name} {suffix}
    </div>
  );
};
