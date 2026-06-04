import { useState } from "react";
import { createPortal } from "react-dom";
import QuickScan4C from "./4c-navigator-quickscan_(1).jsx";

export default function QuickScanModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        overflow: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1200px",
          maxHeight: "95vh",
          overflow: "auto",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10001,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "inherit",
            backdropFilter: "blur(10px)",
          }}
          aria-label="Schließen"
        >
          ×
        </button>
        <QuickScan4C />
      </div>
    </div>,
    document.body
  );
}
