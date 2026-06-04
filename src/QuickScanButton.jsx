import { useState } from "react";
import QuickScanModal from "./QuickScanModal.jsx";

export default function QuickScanButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn--secondary"
        style={{
          marginTop: "24px",
          padding: "14px 32px",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Selbsteinschätzung Ihrer 4C-Reife
      </button>
      <QuickScanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
