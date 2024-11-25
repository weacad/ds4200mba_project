// Set the dimensions and margins of the graph
var margin = { top: 50, right: 30, bottom: 50, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("#histogram")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data
d3.csv("data/gpa_cleaned.csv", function (data) {
  // Ensure GPA is numeric
  data.forEach(function (d) {
    d.gpa = +d.gpa; // Convert gpa to a numeric value
  });
  console.log(data); 


  // X axis: scale and draw
  var x = d3.scaleLinear()
    .domain([2.6, 3.9]) 
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Set the parameters for the histogram
  var histogram = d3.histogram()
    .value(function (d) {
      return d.gpa;
    }) 
    .domain(x.domain()) // Then the domain of the graphic
    .thresholds(x.ticks(20)); // Adjust the number of bins if needed

  // Apply the histogram function to data to get the bins
  var bins = histogram(data);


  // Y axis: scale and draw
  var y = d3.scaleLinear()
    .domain([0, d3.max(bins, function (d) {
      return d.length;
    })]) // Frequency range
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Append the bar rectangles to the SVG element
  svg.selectAll("rect")
    .data(bins)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.x0);
    })
    .attr("y", function (d) {
      return y(d.length);
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function (d) {
      return height - y(d.length);
    })
    .style("fill", "#69b3a2");

    // Add X-axis label
    svg.append("text")
    .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("GPA");
  
  // Add Y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Count");

  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Histogram of GPA Distribution (Accepted)");
});
