"use client";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function ShareModal() {
  const [copied, setCopied] = useState(false);

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
              onFocus={(e) => e.target.select()}
            />
            <button className="btn join-item">
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
          <button className="btn btn-primary" type="button">
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
