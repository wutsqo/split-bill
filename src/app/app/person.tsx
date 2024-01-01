import { FC } from "react";
import { createAvatar } from "@dicebear/core";
import { funEmoji } from "@dicebear/collection";
import { mergeClassname } from "@/utils/merge-classname";
import { Person } from "./type";

interface PersonLabelProps {
  person: Pick<Person, "id" | "name">;
  size?: "sm" | "md" | "lg";
  suffix?: string;
  prefix?: string;
  hideName?: boolean;
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};

export const PersonLabel: FC<PersonLabelProps> = ({
  person,
  size = "md",
  suffix = "",
  prefix = "",
  hideName = false,
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={createAvatar(funEmoji, {
          seed: person.id,
        }).toDataUriSync()}
        alt={person.name}
        className={mergeClassname("mask mask-squircle", sizeMap[size])}
      />
      {prefix} {hideName ? "" : person.name} {suffix}
    </div>
  );
};
