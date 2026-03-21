import React from "react";
import { createRoot } from "react-dom/client";
import QuickScanButton from "./QuickScanButton.jsx";

const quickscanContainer = document.getElementById("quickscan-button-root");
if (quickscanContainer) {
  const root = createRoot(quickscanContainer);
  root.render(<QuickScanButton />);
}
