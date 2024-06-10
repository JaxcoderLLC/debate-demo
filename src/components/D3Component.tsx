"use client"

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

export type chartRow = { date: any; value: any };

export var margin = { top: 10, right: 30, bottom: 30, left: 90 };
export var width = 800 - margin.left - margin.right;
export var height = 700 - margin.top - margin.bottom;

var svg: any;

function d3init() 
{
  return new Promise((resolve, reject) => {
    d3.select("#chart").select("svg").remove();

    // append the svg object to the body of the page
    svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("id", "chartg")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    resolve(console.log("SVG :: ", svg));
  });
}

export default function D3Race({
  id,
  nextRow,
}: {
  id: string,
  nextRow: chartRow;
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  // const [svg, setSvg] = useState<SVGElement>(d3.select("#chart"));
  var did = "#"+id;
  
  useEffect(() => {
    if (!isInitialized) {

      d3init().then(() => {
        setIsInitialized(true);
      });
    } else 
    if (nextRow.date != null) {
      
      console.log("NEXT ROW :: ", nextRow);
      // var svg = d3.select(document.getElementById("#chart")?.ownerDocument);
  
      d3.csv(
        "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",
  
        // When reading the csv, I must format variables:
        function (d: chartRow) {
          return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
        }
      ).then(
        // Now I can use this dataset:
        function (data: any) {
          // Add X axis --> it is a date format
          const x = d3
            .scaleTime()
            .domain(
              d3.extent(data, function (d: { date: any }) {
                return d.date;
              })
            )
            .range([0, width]);
          svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));
  
          // Add Y axis
          const y = d3
            .scaleLinear()
            .domain([
              0,
              d3.max(data, function (d: { value: string | number }) {
                return +d.value;
              }),
            ])
            .range([height, 0]);
          svg.append("g").call(d3.axisLeft(y));
  
          // Add the line
          svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr(
              "d",
              d3
                .line()
                .x(function (d: { date: any }) {
                  return x(d.date);
                })
                .y(function (d: { value: any }) {
                  return y(d.value);
                })
            );
        }
      ).then(() => { // Wrap the if statement inside a function or a block
        if (!isInitialized) {
          setIsInitialized(true);
        }
      });
    }
  },[isInitialized, nextRow]);

  return <></>; // <div id="chart"></div>;
}
