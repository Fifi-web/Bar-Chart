document.addEventListener("DOMContentLoaded", function () {
    const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const dataset = data.data;
        const width = 800;
        const height = 400;
        const padding = 40;
  
        const svg = d3.select("body")
          .append("svg")
          .attr("width", width + padding * 2)
          .attr("height", height + padding * 2);
  
        // Title
        svg.append("text")
          .attr("id", "title")
          .attr("x", width / 2)
          .attr("y", padding / 2)
          .attr("text-anchor", "middle")
          .style("font-size", "20px")
          .text("United States GDP");
  
        // Scales
        const xScale = d3.scaleTime()
          .domain([d3.min(dataset, d => new Date(d[0])), d3.max(dataset, d => new Date(d[0]))])
          .range([padding, width]);
        
        const yScale = d3.scaleLinear()
          .domain([0, d3.max(dataset, d => d[1])])
          .range([height, padding]);
        
        // Axes
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
  
        svg.append("g")
          .attr("id", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
  
        svg.append("g")
          .attr("id", "y-axis")
          .attr("transform", `translate(${padding}, 0)`)
          .call(yAxis);
  
        // Tooltip
        const tooltip = d3.select("body")
          .append("div")
          .attr("id", "tooltip")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("background", "lightgrey")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none") // Prevent tooltip from interfering with mouse events
          .style("opacity", 0);
  
        // Bars
        svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", d => xScale(new Date(d[0])))
          .attr("y", d => yScale(d[1]))
          .attr("width", width / dataset.length)
          .attr("height", d => height - yScale(d[1]))
          .attr("data-date", d => d[0])
          .attr("data-gdp", d => d[1])
          d3.selectAll(".bar")
  .on("mouseover", function (event, d) {
    // Set the tooltip content and position
    d3.select("#tooltip")
      .style("visibility", "visible") // Make tooltip visible
      .style("opacity", 1) // Ensure opacity is set to 1 (fully visible)
      .attr("data-date", d[0]) // Set the correct data-date attribute
      .html(`Date: ${d[0]}<br>GDP: ${d[1]}`) // Add data to the tooltip
      .style("left", event.pageX + 10 + "px") // Position tooltip horizontally near the mouse
      .style("top", event.pageY - 40 + "px"); // Position tooltip slightly above the mouse
  })
  .on("mouseout", function () {
    // Hide the tooltip when mouse leaves the bar
    d3.select("#tooltip")
      .style("visibility", "hidden") // Tooltip should be hidden
      .style("opacity", 0) // Ensure tooltip is fully transparent when hidden
      .attr("data-date", ""); // Reset the data-date attribute
  });

         });
  });
  