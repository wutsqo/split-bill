"use client";

import { SITE_URL } from "@/app/config";
import { Database } from "@/supabase.types";
import { required, validate } from "@/utils/forms";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import useFormState from "@hooks/useFormState";
import { useGroupStore } from "@hooks/useGroupStore";
import useStore from "@hooks/useStore";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ShareModal() {
  const groupId = useStore(useGroupStore, (state) => state.id);
  const isPublic = useStore(useGroupStore, (state) => state.is_public);
  const updateGroup = useGroupStore((state) => state.updateGroup);
  const { data, updateData } = useFormState(
    {
      method: isPublic ? "public" : "private",
    },
    {
      method: validate([required]),
    }
  );
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(`${SITE_URL}/report/${groupId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };
  const onShare = () => {
    navigator.share({
      title: "Split Expenses",
      text: "Check out this expense report",
      url: `${SITE_URL}/report/${groupId}`,
    });
  };
  const supabase = createClientComponentClient<Database>();
  useEffect(() => {
    if (!groupId) return;
    supabase
      .from("split_groups")
      .update({ is_public: data.method === "public" })
      .eq("id", groupId)
      .select()
      .then((res) => {
        if (res.error) {
          toast.error("Failed to update group visibility");
          updateData("method", isPublic ? "public" : "private");
        } else {
          updateGroup({ is_public: data.method === "public" });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.method, groupId]);
  useEffect(() => {
    if (!groupId) return;
    updateData("method", isPublic ? "public" : "private");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  return (
    <dialog id="share_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Visibility</h3>

        <div className="form-control w-full">
          <label className="label" htmlFor="share-method-input">
            <span className="label-text"></span>
          </label>
          <select
            id="share-method-input"
            className="select select-bordered w-full"
            value={data.method}
            onChange={(e) => updateData("method", e.target.value)}
          >
            <option value="private">Only me can view</option>
            <option value="public">Anyone with the link can view</option>
          </select>
        </div>

        <div className="form-control w-full mt-4">
          <label className="label" htmlFor="link-input">
            <span className="label-text">Link</span>
          </label>

          <span className="join">
            <input
              id="link-input"
              placeholder="What's the password?"
              className="input input-bordered w-full join-item"
              value={`${SITE_URL}/report/${groupId}`}
              onFocus={(e) => e.target.select()}
            />
            <button className="btn join-item" onClick={onCopy}>
              {copied ? (
                <>
                  <DocumentDuplicateIcon className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <DocumentDuplicateIcon className="w-5 h-5" />
                  Copy Link
                </>
              )}
            </button>
          </span>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
          <button className="btn btn-primary" type="button" onClick={onShare}>
            Share
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
