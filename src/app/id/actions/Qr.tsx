import QrIcon from "@/assets/svg/icon/icon_qr.svg?react";
import { QRCodeGenerator } from "@/components";
import { useStore } from "@/hooks";
import { useMemo, useRef } from "react";
// import MediumIcon from "@/assets/svg/icon/icon_medium.svg?react";
// import XIcon from "@/assets/svg/icon/icon_x.svg?react";
// import InsIcon from "@/assets/svg/icon/icon_ins.svg?react";
// import DyIcon from "@/assets/svg/icon/icon_dy.svg?react";
import { siteConfig } from "@/constants";
import DefaultAvatar from "@/assets/images/avatar.jpg";

export default function () {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { User } = useStore();
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const qrLink = useMemo(() => `${siteConfig.url}/#/id/${User.id}`, [User.id]);

  return (
    <div className="w-full">
      <button
        className="bg-white border-none rounded-lg bg-opacity-20 text-white text-xs w-full btn"
        onClick={openModal}
      >
        <QrIcon />
        QR Code
      </button>

      <dialog ref={modalRef} className="modal">
        <div className="w-[90vw] modal-box sm:max-w-[460px]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="top-2 right-2 btn btn-sm btn-circle btn-ghost absolute">
              ✕
            </button>
          </form>
          <div className="flex flex-col py-12 gap-6 items-center">
            <div className="flex flex-col gap-2 items-center">
              <div className="avatar">
                <div className="border rounded-full border-neutral-400 w-16">
                  <img src={User.profile?.avatar || DefaultAvatar} />
                </div>
              </div>
              <span className="font-semibold text-base text-gray-800">
                {User.profile?.name}
              </span>
              <div className="flex gap-2"></div>
            </div>

            <QRCodeGenerator cellSize={180} url={qrLink} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
