"use client";
import React, { useEffect, useRef, useId } from "react";

type Props = {
  onClose?: () => void;
  open: boolean;
  title?: string;
  children: React.ReactNode;
  closeByModal?: boolean;
  modal?: boolean;
};

export const ActionModal = function (props: Props) {
  const domId = useRef<string>(`my_modal_${useId()}`);

  useEffect(() => {
    const openModal = () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (document.getElementById(domId.current) as any)?.showModal();
    };

    if (props.open) {
      openModal();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      (document.getElementById(domId.current) as any)?.close();
    }
  }, [props]);

  return (
    <>
      <dialog id={domId.current} className="modal items-end">
        <div className="modal-box w-full max-w-full overflow-hidden rounded-bl-none rounded-br-none">
          {!props.closeByModal && !props.modal && (
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={() => props.onClose && props.onClose()}
              >
                ✕
              </button>
            </form>
          )}
          {props.title && (
            <h5 className="-mt-2 mb-2 text-lg font-normal">{props.title}</h5>
          )}
          <div className="mb-4 border-t"></div>
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
    </>
  );
};
