import React from "react";

export default function ScanlineOverlay() {
  return (
    <>
      {/* Moving scanner bar */}
      <div className="scanline" />
      {/* CRT scan lines texture */}
      <div className="crt-overlay" />
      {/* Faint grain texture */}
      <div className="grain-overlay" />
    </>
  );
}
