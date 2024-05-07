import React, { useRef, useEffect, useState } from "react";
import { ActionModal } from "@/components";
import { useMedia } from "react-use";
import { FiChevronsRight } from "react-icons/fi";

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
  const [isOpen, setIsOpen] = useState<boolean>(props.open);

  useEffect(() => {
    if (props.open) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [props.open]);

  return isMobile ? (
    <ActionModal {...props} />
  ) : (
    <div className="drawer drawer-end">
      <input
        ref={inputDom}
        checked={isOpen}
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="z-50 drawer-side">
        <label
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => {
            if (props.closeByModal && inputDom.current) {
              setIsOpen(false);
              props.onClose?.();
            }
          }}
        ></label>
        <div className="bg-white flex flex-col h-full relative">
          {props.closeByModal && isOpen && (
            <div
              style={{
                position: "absolute",
                left: "-44px",
                top: "34%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "#1E5EFF",
                color: "#fff",
                borderRadius: "5px 0 0 5px",
              }}
              onClick={() => {
                if (inputDom.current) {
                  setIsOpen(false);
                  props.onClose?.();
                }
              }}
            >
              <FiChevronsRight className="h-6 w-6" />
            </div>
          )}
          {props.title && (
            <h5 className="font-semibold m-4 text-lg">{props.title}</h5>
          )}
          <div className="flex-1 overflow-hidden ">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
