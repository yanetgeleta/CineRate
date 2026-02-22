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
    // 1. The Overlay: Fixed to screen, dark semi-transparent background, z-index high
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* 2. The Modal Box: White background, rounded corners, shadow */}
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-2xl">
        {/* 3. The Close Button: Positioned absolute in the top-right corner */}
        <div className="absolute top-2 right-2">
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
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
