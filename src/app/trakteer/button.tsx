"use client";

import React from "react";

import { useTrakteer } from "./provider";
import Image from "next/image";

type Props = {
  className?: string;
  size?: number;
};

const TrakteerButton = ({ className, size = 100 }: Props) => {
  const { trakteerRef, setIsTrakteerOpen, isLoading, setIsLoading } =
    useTrakteer();

  const onButtonClick = () => {
    setIsLoading(true);
    setIsTrakteerOpen(true);
    trakteerRef.current.contentWindow!.postMessage(
      { type: "embed.openModal" },
      "*"
    );
  };

  return (
    <button
      className={`normal-case overflow-visible transition group flex justify-start items-center gap-2 ${className}`}
      onClick={() => onButtonClick()}
    >
      <span className="animate-[trbtn-wiggle_3s_infinite] overflow-visible h-6 w-6 shrink-0">
        <Image
          src="https://trakteer.id/images/mix/coffee.png"
          alt="Traktiran"
          width={(21 * size) / 100}
          height={(26 * size) / 100}
          className={
            isLoading ? "scale-[200%] transition-all" : "transition-all"
          }
        />
      </span>
      <span className="group-hover:hidden">Buy me a Coffee</span>
      <span className="hidden group-hover:block">
        Support Indie Developers 🤍
      </span>
    </button>
  );
};

export default TrakteerButton;
