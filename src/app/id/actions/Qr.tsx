import QrIcon from "@/assets/svg/icon/icon_qr.svg?react";
import { QRCodeGenerator } from "@/components";
import { useStore } from "@/hooks";
import { useMemo, useRef } from "react";
// import MediumIcon from "@/assets/svg/icon/icon_medium.svg?react";
// import XIcon from "@/assets/svg/icon/icon_x.svg?react";
// import InsIcon from "@/assets/svg/icon/icon_ins.svg?react";
// import DyIcon from "@/assets/svg/icon/icon_dy.svg?react";
import { siteConfig } from "@/constants";
// import { siteConfig } from "@/constants";

export default function () {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { User } = useStore();
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const qrLink = useMemo(() => `${siteConfig.url}/id/${User.id}`, [User.id]);

  return (
    <div className="w-full">
      <button
        className="btn w-full bg-white bg-opacity-20 rounded-lg text-white border-none text-xs"
        onClick={openModal}
      >
        <QrIcon />
        QR Code
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-[90vw] sm:max-w-[460px]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="py-12 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="avatar">
                <div className="w-16 rounded-full border border-neutral-400">
                  <img src={User.profile?.avatar} />
                </div>
              </div>
              <span className="text-gray-800 text-base font-semibold">
                {User.profile?.name}
              </span>
              <div className="flex gap-2">
                <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                  {/* <MediumIcon /> */}
                </a>
                <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                  {/* <XIcon /> */}
                </a>
                <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                  {/* <InsIcon /> */}
                </a>
                <a className="btn btn-circle btn-xs bg-gray-600 border-none">
                  {/* <DyIcon /> */}
                </a>
              </div>
              <span className="text-white text-base font-bold">
                {User.profile?.name}
              </span>
            </div>
            <hr className="w-72 border-t-2 border-gray-200 border-dashed" />

            <QRCodeGenerator cellSize={180} url={qrLink} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
