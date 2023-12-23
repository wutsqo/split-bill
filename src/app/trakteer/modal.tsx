"use client";

import { useEffect } from "react";
import { useTrakteer } from "./provider";

function TrakteerModal() {
  const { isTrakteerOpen, trakteerRef, setIsTrakteerOpen, setIsLoading } =
    useTrakteer();

  useEffect(() => {
    window.addEventListener("message", function (t) {
      "embed.modalClosed" == t.data.type &&
        setTimeout(function () {
          setIsTrakteerOpen(false);
        }, 200);
    });
  }, []);

  return (
    <div
      className={`fixed inset-0 w-full h-full z-[99999] ${
        isTrakteerOpen ? "block" : "hidden"
      }`}
    >
      <iframe
        ref={trakteerRef}
        title="Traktir Choco Latte"
        frameBorder="0"
        src={
          isTrakteerOpen
            ? `https://trakteer.id/wutsqo/tip/embed/modal?embedId=0&ref=${window.location.href}`
            : "about:blank"
        }
        className="w-full h-full border-none bg-transparent"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
}

export default TrakteerModal;
