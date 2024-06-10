"use server";

import Papa from 'papaparse';
// import * as fs from 'fs';
import { promises as fs } from 'fs';
import path from 'path';
import { chartRow } from '@/components/D3Component';

export async function getCSV(filename: string) : Promise<Array<chartRow>> {
  // const blob = await fs.readFileSync("public/data.csv", {encoding: 'utf-8',});  
    
    const data = Papa.parse( 
        await fs.readFile(
            path.resolve("public/",filename), {encoding: 'utf-8',}
        ), {
          header: true,
          complete: (results) => {
              console.log({ results })
          },
      }
    );  
    return data.data as Array<chartRow>;
}


      // const json = csvFileToArray(csv);
      //   fileReader.onload = function (e) {
      //     csvFileToArray(file);
      //   };
      // if (file) {
      //   fileReader.readAsText(file);
      // }
      // fetch(file)
      // .then(response => response.blob())
      // .then(blob => {
      //   fileReader.readAsText(blob);
      // });



// function download(blob: any, filename: string) {

//   console.log("RESPONSE BODY?? :: ",  blob);

//   // const url = window.URL.createObjectURL(blob);
//   // const a = document.createElement('a');
//   // a.style.display = 'none';
//   // a.href = url;
//   // // the filename you want
//   // a.download = filename;
//   // document.body.appendChild(a);
//   // a.click();
//   // document.body.removeChild(a);
//   // window.URL.revokeObjectURL(url);
// }
// ________________________________________________

// async function getFile(file: string) {

//   // const csvFile = await fs.readFile(process.cwd() + '/app/live/data.csv', 'utf8');
//   // const publicURL: string = process.env.PUBLIC_URL;
//   const dataPath = path.resolve(window.location.origin,'public','data.csv');
//   // const dataPath = window.location.origin + '/data.csv'; // process.env.PUBLIC_URL + '/data.csv';
//   console.log("DATA PATH :: ",dataPath);
//   const csvFile = await fs.readFile(dataPath, 'utf8');
//   return csvFile;
//       // .then((data) => {
//       //     console.log("CSV FILE :: ",data);
//       // });

//   // Let's say your json is in /public/assets/my-json.json
//   // const filePath = path.resolve('@/app','live',file);
//   // console.log("filePath :: ",filePath);
//   // const csv = fs.readFileSync(filePath);

//   // const response = await fetch(file); // "http://example.com/movies.json");
//   // response.blob().then(blob => download(blob, "3_TwoNumOrdered_comma"));

//   // console.log("RESPONSE BODY?? :: ",response.json());
//   // const movies = await response.json();
//   // console.log("CSV :: ",csv);
// }


  // const fileReader = new FileReader();
  // fileReader.onload = function (event) {
  //   const text = event.target?.result;
  //   console.log("CSV:: ",text);
  //  //  console.log(event.target.result);
  //   // csvFileToArray(text);
  // };

  // function addListeners(reader: FileReader) {
  //   reader.addEventListener("loadstart", handleEvent);
  //   reader.addEventListener("load", handleEvent);
  //   reader.addEventListener("loadend", handleEvent);
  //   reader.addEventListener("progress", handleEvent);
  //   reader.addEventListener("error", handleEvent);
  //   reader.addEventListener("abort", handleEvent);
  // }

  // async function GetData(csv_file: string) {
  //     const data = Papa.parse(await fetchCsv(csv_file));
  //     // console.log(data);
  //     return data;
  // }

  // async function fetchCsv(csv_file: string) {
  //   const response = await fetch(csv_file);
  //   const reader = response.body?.getReader();
  //   // const reader = response.body ? response.body.getReader() : null;
  //   const result = await reader?.read();
  //   const decoder = new TextDecoder('utf-8');
  //   const csv = await decoder.decode(result?.value);
  //   console.log('csv', csv);
  //   return csv;
  // }