"use client";

import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import { cumSum } from "@/utils/cumsum";

export default function Live() {
  const [isInitialized, setIsInitialized] = useState(false);
  const svgContainerRef = useRef(null);

  useEffect(() => {
    if (!isInitialized) {
      const margin = { top: 10, right: 30, bottom: 30, left: 90 },
        width = 800 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

      // Clear existing SVG if necessary
      d3.select(svgContainerRef.current).select("svg").remove();

      // Append new SVG
      const svgElement = d3
        .select(svgContainerRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("suppressHydrationWarning", true)
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Execute your D3 chart function
      cumSum({ width, height, svg: svgElement });

      setIsInitialized(true); // Set initialization to true to prevent reruns
    }
    // This empty dependency array ensures the effect runs only once on mount
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center h-20">
        <span className="text-3xl">💵 Live Donations 💵</span>
      </div>
      <div
        className="border-2 border-blue-500 rounded-xl shadow-xl p-4"
        id="my_dataviz"
        ref={svgContainerRef} // Use ref to target the div for D3 manipulations
      />
    </div>
  );
}
