"use client";

import { useState, useEffect } from "react";

const DISCLAIMER_TEXT = "Please note: Some events and venues listed on this platform may be postponed or cancelled due to the ongoing situation in the region. We recommend confirming directly with the organiser before making plans.";

const STORAGE_KEY = "bahrainnights-regional-disclaimer-dismissed";

export function RegionalDisclaimer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted || !isVisible) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: "#fef3c7", // amber-100
        borderBottom: "1px solid #f59e0b", // amber-500
        padding: "12px 16px",
        position: "relative",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#92400e", // amber-800
            lineHeight: 1.5,
          }}
        >
          {DISCLAIMER_TEXT}
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            fontSize: "18px",
            color: "#92400e",
            opacity: 0.7,
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
