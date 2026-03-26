"use client";

import React, { useEffect, useRef } from "react";
import ShapesPit from "./ballpit";

export default function Footer() {
  return (
    <>
    
    <div style={{ width: "100vw", height: "100vh" , background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)'  }}>
      <ShapesPit count={420} />
    </div>
    </>
  );
}
