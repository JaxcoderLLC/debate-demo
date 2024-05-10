"use client";

import * as d3 from 'd3';
import { useEffect, useLayoutEffect, useState } from "react";

export default function Live() {

  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  return (
    <div>
      <h1>Live Page</h1>
      <div id="my_dataviz" />
    </div>
  );
}
