"use client";

import { createContext, useContext, useRef, useState } from "react";
import { TrakteerContextValue, TrakteerProviderProps } from "./type";

const TrakteerContext = createContext<TrakteerContextValue | undefined>(
  undefined
);

const TrakteerProvider = ({ children }: TrakteerProviderProps) => {
  const trakteerRef = useRef<HTMLIFrameElement>(null!);
  const [isTrakteerOpen, setIsTrakteerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TrakteerContext.Provider
      value={{
        trakteerRef,
        isTrakteerOpen,
        setIsTrakteerOpen,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TrakteerContext.Provider>
  );
};

function useTrakteer() {
  const context = useContext(TrakteerContext);
  if (context === undefined) {
    throw new Error("useTrakteer must be used within a TrakteerProvider");
  }
  return context;
}

export { useTrakteer, TrakteerProvider };
