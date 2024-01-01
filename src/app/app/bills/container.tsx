"use client";

import { useEffect, useRef, useState } from "react";
import { PlusIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { TrxCard } from "./trx-card";
import axios from "axios";
import { usePeopleStore } from "@hooks/usePeopleStore";
import RemoveModal from "./remove-modal";
import EmptyState from "./empty-state";
import NextButton from "./next-button";
import { useTransactionStore } from "@hooks/useTransactionStore";
import TrxModal from "./trx-modal";

export default function BillsContainer() {
  const { people } = usePeopleStore();
  const newTrxModal = useRef<HTMLDialogElement>(null);
  const [selectedId, setSelectedId] = useState<string>("");
  const [modalAction, setModalAction] = useState<"add" | "edit">("add");
  const removeModalRef = useRef<HTMLDialogElement>(null);
  const transactions = useTransactionStore((state) => state.transactions);
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction
  );

  useEffect(() => {
    usePeopleStore.persist.rehydrate();
  }, []);

  if (people.length <= 1) {
    return (
      <div className="min-h-[calc(100vh-14.5rem)]">
        <div role="alert" className="alert mt-4">
          <div className="w-full flex justify-center gap-3 items-center text-sm text-center sm:col-span-2 sm:text-base">
            <span>💡</span>
            <span>Add at least 2 people to get started</span>
          </div>
        </div>
        <NextButton
          numberOfTransactions={transactions.length}
          totalAmount={transactions.reduce((acc, trx) => acc + trx.amount, 0)}
          disabled={transactions.length === 0}
        />
      </div>
    );
  }

  const onExport = () => {
    axios
      .post("/api/trx/csv", {
        transactions,
        people,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "transactions.csv");
        document.body.appendChild(link);
        link.click();
      });
  };

  const onRemoveModalOpen = (id: string) => {
    setSelectedId(id);
    removeModalRef.current?.showModal();
  };

  const onRemoveTransaction = (id: string) => {
    removeTransaction(id);
    removeModalRef.current?.close();
  };

  const onEditTransactionModalOpen = (id: string) => {
    setSelectedId(id);
    setModalAction("edit");
    newTrxModal.current?.showModal();
  };

  const onAddTransactionModalOpen = () => {
    setSelectedId("");
    setModalAction("add");
    newTrxModal.current?.showModal();
  };

  return (
    <div className="py-4 flex flex-col gap-4 min-h-[calc(100vh-13.5rem)]">
      <div className="join w-full bg-base-100">
        <button
          type="button"
          className="btn btn-ghost text-xs join-item w-1/2 uppercase"
          onClick={onAddTransactionModalOpen}
        >
          <PlusIcon className="h-4 w-4" />
          New Transaction
        </button>
        <div className="bg-base-200 w-0.5 shrink-0 h-12 join-item"></div>
        <button
          type="button"
          className="btn btn-ghost text-xs join-item w-1/2 uppercase"
          onClick={onExport}
          disabled={transactions.length === 0}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {transactions.length === 0 ? <EmptyState /> : null}

      {transactions.map((trx) => (
        <TrxCard
          person={trx.paidBy}
          trx={trx}
          key={trx.id}
          onRemoveModalOpen={() => onRemoveModalOpen(trx.id)}
          onEditModalOpen={() => onEditTransactionModalOpen(trx.id)}
        />
      ))}

      <NextButton
        numberOfTransactions={transactions.length}
        totalAmount={transactions.reduce((acc, trx) => acc + trx.amount, 0)}
        disabled={transactions.length === 0}
      />

      <TrxModal
        ref={newTrxModal}
        onClose={() => {
          newTrxModal.current?.close();
        }}
        transaction={transactions.find((trx) => trx.id === selectedId)}
        mode={modalAction}
      />

      <RemoveModal
        onRemove={onRemoveTransaction}
        ref={removeModalRef}
        trxId={selectedId}
        trxName={transactions.find((trx) => trx.id === selectedId)?.name ?? ""}
      />
    </div>
  );
}
