"use client";

import { useGroupStore } from "@hooks/useGroupStore";
import useStore from "@hooks/useStore";
import { useFormState, useFormStatus } from "react-dom";
import { generatePDF } from "./actions";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase.types";
import { useEffect } from "react";
import { appName } from "@/app/config";

function GenerateButton({ disabled }: { readonly disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="btn btn-primary"
      disabled={disabled}
    >
      {pending ? (
        <>
          <span className="loading loading-spinner"></span>Generating PDF...
        </>
      ) : (
        <span> Generate PDF</span>
      )}
    </button>
  );
}

const initialState = {
  message: "",
  path: "",
};

export default function PDFModal() {
  const groupId = useStore(useGroupStore, (state) => state.id);
  const userId = useStore(useGroupStore, (state) => state.user_id);
  const quota = useStore(useGroupStore, (state) => state.quota);
  const updateQuota = useGroupStore((state) => state.updateQuota);
  const [state, formAction] = useFormState(generatePDF, initialState);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    if (!state.path) return;
    supabase.storage
      .from("pdf")
      .download(state.path)
      .then((res) => {
        supabase.from("pdf_quota").upsert({
          user_id: userId as string,
          current: (quota?.current as number) - 1,
        });
        if (res.data === null) return;
        const url = URL.createObjectURL(res.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${appName} Summary.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    updateQuota({ current: (quota?.current as number) - 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <dialog id="pdf_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Export to PDF</h3>
        <div className="mt-4">
          You have <strong> {quota?.current}</strong> PDF exports left.
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
          <form action={formAction}>
            <input type="hidden" name="group_id" value={groupId} />
            <GenerateButton disabled={quota?.current === 0} />
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
