"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  onClose?: () => void;
  open: boolean;
  title?: string;
  children: React.ReactNode;
  closeByModal?: boolean;
  modal?: boolean;
};

export const ActionModal = function (props: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.open) {
      dialogRef.current?.showModal();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      dialogRef.current?.close();
    }
  }, [props.open]);

  return (
    <dialog ref={dialogRef} className="modal items-end ">
      <div className="rounded-bl-none rounded-br-none max-w-full w-full modal-box overflow-hidden sm:w-[460px]">
        {!props.closeByModal && !props.modal && (
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="top-2 right-2 btn btn-circle btn-ghost btn-sm absolute"
              onClick={() => props.onClose && props.onClose()}
            >
              ✕
            </button>
          </form>
        )}
        {props.title && (
          <h5 className="font-normal -mt-2 text-lg mb-2">{props.title}</h5>
        )}
        <div className="border-t mb-4"></div>
        {props.children}
      </div>

      {props.closeByModal && !props.modal && (
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => props.onClose && props.onClose()}
        >
          <button>✕</button>
        </form>
      )}
    </dialog>
  );
};
