import ImageReveal from "./skills";
import React from "react";
import "./skills.css";

export default function Skillsdemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          My Skills
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Hover over the images to see the reveal effect.
        </p>
      </div>
      <ImageReveal
          leftImage="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=400"
          middleImage="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=400&h=400"
          rightImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400&h=400"
      />
    </div>
  );
}

