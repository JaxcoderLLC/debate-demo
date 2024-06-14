"use client"

import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

export type chartRow = { date: any; value: any };

export const margin = { top: 10, right: 30, bottom: 30, left: 90 };
export const width = 800 - margin.left - margin.right;
export const height = 700 - margin.top - margin.bottom;

let svg: any;
let x: any;
let y: any;
let d3data1: Array<chartRow> = [];
let d3data2: Array<chartRow> = [];

function d3init() {
  return new Promise((resolve, reject) => {
    try {
      d3.select("#chart").select("svg").remove();

      // append the svg object to the body of the page
      svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis --> it is a date format
      x = d3.scaleTime()
        .domain([
          d3.timeParse("%Y-%m-%d")("2013-04-28"),
          d3.timeParse("%Y-%m-%d")("2018-04-23")
        ])
        .range([0, width]);

      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      // Add Y axis
      y = d3.scaleLinear()
        .domain([0, 20500])
        .range([height, 0]);

      svg.append("g")
        .call(d3.axisLeft(y));

      resolve(svg);
    } 
    catch (error) {
      reject(console.log("D3 DRAW ERROR :: ", error));
    }

  });
}

function d3csv(data: chartRow) {
  console.log("CHART DATA :: ", data);
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

  svg
    .append("g")
    .call(d3.axisLeft(y));

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

function d3append(data: chartRow) {
  return new Promise((resolve, reject) => {
    try {
      d3data1.push(data);
      resolve(d3data1);
    } catch (error) {
      reject(console.log("D3 APPEND ERROR :: ", error));
    }
  });
}

function d3draw(newData: chartRow) {
  d3append(newData)
    .then(() => {
      console.log("D3DATA-1 :: ", d3data1);
      d3.select("#chart").select("#line").remove();
    })
    .then(() => {
      // Add the new line
      svg.append("path")
        .attr("id", "line")
        .datum(d3data1)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d",
          d3.line()
            .x(function (d: { date: any }) {
              return x(d.date);
            })
            .y(function (d: { value: any }) {
              return y(d.value);
            })
        );
    });
  // .catch((err) => {
  //   console.log("D3 ERROR :: ", err)
  // });
}

export default function D3Race({
  id,
  nextRow,
}: {
  id: string,
  nextRow: chartRow;
}) {
  const [isD3initialized, setIsD3initialized] = useState(false);
  // const [svg, setSvg] = useState<SVGElement>(d3.select("#chart"));
  let did = "#" + id;

  useEffect(() => {
    if (!isD3initialized) {

      d3init().then(() => {
        setIsD3initialized(true);
      });
    } else
      if (nextRow.date != null) {

        console.log("NEXT ROW :: ", nextRow);
        // let svg = d3.select(document.getElementById("#chart")?.ownerDocument);

        d3draw(nextRow);

        // d3.csv(
        //   "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

        //   // When reading the csv, I must format variables:
        //   function (d: chartRow) {
        //     return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
        //   }
        // ).then(
        //   function (data: chartRow) {
        //     d3csv (data);
        //   }
        // );
      }
  }, [isD3initialized, nextRow]);

  return <div id="chart"></div>;
}
