import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const ConfirmModal = ({
  title,
  desc,
  message,
  isOpen,
  continueMsg,
  cancelMsg,
  handleCancel,
  handleContinue,
  continueMsgClass,
  cancelMsgClass,
}) => {
  return (
    // ai generated code for the taiwind, understand what it means later
    <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 aria-hidden:true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 border bg-[#0b1326] p-12 shadow-xl rounded-2xl">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>

          <Description className="leading-relaxed text-sm font-medium">
            {desc}
          </Description>

          <p className="leading-relaxed text-sm text-slate-400">{message}</p>

          <div className="flex gap-4 pt-4">
            <button className={cancelMsgClass} onClick={handleCancel}>
              {cancelMsg}
            </button>

            <button className={continueMsgClass} onClick={handleContinue}>
              {continueMsg}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
