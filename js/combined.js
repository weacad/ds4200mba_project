// Set the dimensions and margins of the graph
var margin = { top: 50, right: 30, bottom: 50, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("#combined")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load both datasets
Promise.all([
  d3.csv("data/gpa_accepted.csv"),
  d3.csv("data/gpa_rejected.csv")
]).then(function (datasets) {
  var acceptedData = datasets[0];
  var rejectedData = datasets[1];

d3.csv("data/gpa_accepted.csv").then(data => console.log(data));


  // Convert GPA to numeric for both datasets
  acceptedData.forEach(d => d.gpa = +d.gpa);
  rejectedData.forEach(d => d.gpa = +d.gpa);

  // X axis: scale and draw
  var x = d3.scaleLinear()
    .domain([2.6, 3.9]) 
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Create a histogram for each dataset
  var histogram = d3.histogram()
    .value(d => d.gpa)
    .domain(x.domain())
    .thresholds(x.ticks(20));

  var acceptedBins = histogram(acceptedData);
  var rejectedBins = histogram(rejectedData);

  // Y axis: scale and draw
  var y = d3.scaleLinear()
    .domain([0, d3.max([...acceptedBins, ...rejectedBins], d => d.length)])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));



  // Draw bars for rejected data
  svg.selectAll(".bar.rejected")
    .data(rejectedBins)
    .enter()
    .append("rect")
    .attr("class", "bar rejected")
    .attr("x", d => x(d.x0))
    .attr("y", d => y(d.length))
    .attr("width", d => x(d.x1) - x(d.x0) - 1)
    .attr("height", d => height - y(d.length))
    .style("fill", "#ff6361")
    .style("opacity", 0.6);

  // Draw bars for accepted data
  svg.selectAll(".bar.accepted")
    .data(acceptedBins)
    .enter()
    .append("rect")
    .attr("class", "bar accepted")
    .attr("x", d => x(d.x0))
    .attr("y", d => y(d.length))
    .attr("width", d => x(d.x1) - x(d.x0) - 1)
    .attr("height", d => height - y(d.length))
    .style("fill", "#69b3a2")
    .style("opacity", 0.6);

  // Add a legend
  var legend = svg.append("g")
    .attr("transform", "translate(" + (width - 100) + ",20)");

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", "#69b3a2")
    .style("opacity", 0.6);

  legend.append("text")
    .attr("x", 20)
    .attr("y", 12)
    .text("Accepted")
    .style("font-size", "12px");

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 20)
    .attr("width", 15)
    .attr("height", 15)
    .style("fill", "#ff6361")
    .style("opacity", 0.6);

  legend.append("text")
    .attr("x", 20)
    .attr("y", 32)
    .text("Rejected")
    .style("font-size", "12px");

  // Add chart title
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Histogram of GPA Distribution");
});
