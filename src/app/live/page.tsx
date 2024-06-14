"use client";

import { useEffect, useState, useRef } from "react";
import React from 'react';

import { getCSV } from "@/utils/getcsv";
import D3Race, {chartRow} from '@/components/D3Component';
import * as d3 from 'd3';

export default function Live() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [data, setData] = useState<Array<chartRow>>([{ date: null, value: null }]);
  const [next, setNext] = useState<chartRow>({ date: null, value: null }); // Provide an initial value for 'next' state variable
  const [count, setCount] = useState<number>(0);

  async function getData(filename: string) {
    // const blah: Array<chartRow> = await getCSV("data.csv");
    setData(await getCSV("data.csv"));
  }
  
  useEffect(() => { // useMemo?
    if (!isInitialized) { 
      getData("data.csv");
      setIsInitialized(true);
    } 
  }, [isInitialized]);

  function formatRow(d: chartRow) {
    return { date: d3.timeParse("%Y-%m-%d")(d.date), value: d.value };
  }

  function nextData() {
    var rowSlice = data.slice(count, count+1);
    console.log("ROW SLICE :: ", formatRow(rowSlice[0]));
    setNext(formatRow(rowSlice[0]));
    setCount(count+1);
  }

  return (
    <div>
      <button onClick={nextData}>Sim Donations</button>
      <D3Race id="chart" nextRow={next} />
    </div>
  );
}
