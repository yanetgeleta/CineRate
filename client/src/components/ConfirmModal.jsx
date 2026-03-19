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
}) => {
  return (
    // ai generated code for the taiwind, understand what it means later
    <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
      {/* 1. The Backdrop */}
      <div className="fixed inset-0 bg-black/30 aria-hidden:true" />

      {/* 2. Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-md space-y-4 border bg-white p-12 shadow-xl rounded-2xl">
          <DialogTitle className="text-xl font-bold text-gray-900">
            {title}
          </DialogTitle>

          <Description className="text-sm font-medium text-gray-500">
            {desc}
          </Description>

          <p className="text-gray-700">{message}</p>

          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 rounded-lg px-4 py-2 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={handleCancel}
            >
              {cancelMsg}
            </button>

            <button
              className="flex-1 rounded-lg px-4 py-2 font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
              onClick={handleContinue}
            >
              {continueMsg}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
