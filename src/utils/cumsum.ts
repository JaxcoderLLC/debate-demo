import * as d3 from "d3";

export const cumSum = ({
  width,
  height,
  svg,
}: {
  width: number;
  height: number;
  svg: any;
}) => {
  console.log("Generating Chart...");
  //Read the data
  d3.csv(
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv",

    // When reading the csv, I must format variables:
    function (d: { date: any; value: any }) {
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
  );
};
