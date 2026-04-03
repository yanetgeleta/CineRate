import React from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

function Modal({ isOpen, onClose, children }) {
  const modalRoot = document.getElementById("modal-root");

  if (!isOpen) return null;
  return createPortal(
    // Not my tailwind code so try to understand and rewrite it later

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg p-6 bg-[#121022] rounded-lg shadow-2xl">
        <div className="absolute top-2 right-2">
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </div>

        {/* 4. The Content passed from ReviewModal */}
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    modalRoot,
  );
}

export default Modal;
