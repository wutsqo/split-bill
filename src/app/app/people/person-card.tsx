import { createAvatar } from "@dicebear/core";
import { Person } from "../type";
import { funEmoji } from "@dicebear/collection";
import { FC } from "react";

interface PersonCardProps {
  person: Person;
}

const PersonCard: FC<PersonCardProps> = ({ person }) => {
  return (
    <div className="bg-base-100 flex flex-row gap-4 items-center join-item p-2 first:rounded-t-lg last:rounded-b-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={createAvatar(funEmoji, {
          seed: person.name,
        }).toDataUriSync()}
        alt={person.name}
        className="mask mask-squircle w-12 h-12"
      />
      <div className="w-full">{person.name}</div>
    </div>
  );
};

export default PersonCard;
