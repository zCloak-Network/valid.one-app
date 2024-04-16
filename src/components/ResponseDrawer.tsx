import React, { useRef, useEffect } from "react";
import { ActionModal } from "@/components";
import { useMedia } from "react-use";

type Props = {
  onClose?: () => void;
  open: boolean;
  title?: string;
  children: React.ReactNode;
  closeByModal?: boolean;
  modal?: boolean;
};

export const ResponseDrawer = function (props: Props) {
  const inputDom = useRef<HTMLInputElement>(null);
  const isMobile = useMedia("(max-width: 480px)");

  useEffect(() => {
    if (props.open) {
      inputDom.current && (inputDom.current.checked = true);
    } else {
      inputDom.current && (inputDom.current.checked = false);
    }
  }, [props.open]);

  return isMobile ? (
    <ActionModal {...props} />
  ) : (
    <div className="drawer drawer-end">
      <input ref={inputDom} type="checkbox" className="drawer-toggle" />
      <div className="z-50 drawer-side">
        <label
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => {
            if (props.closeByModal && inputDom.current) {
              inputDom.current.checked = false;
              props.onClose?.();
            }
          }}
        ></label>
        <div className="bg-white flex flex-col h-full">
          {props.title && (
            <h5 className="font-normal m-4 text-lg">{props.title}</h5>
          )}
          <div className="border-t flex-1 overflow-hidden ">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};
