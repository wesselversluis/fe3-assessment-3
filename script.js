// This code is based on the following awesome projects 
// https://gist.github.com/tezzutezzu/c2653d42ffb4ecc01ffe2d6c97b2ee5e 
// http://bl.ocks.org/rajvansia/ce6903fad978d20773c41ee34bf6735c
// https://bl.ocks.org/santi698/f3685ca8a1a7f5be1967f39f367437c0

var margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40,
}

var width = 660 - margin.left - margin.right;
var height = 700 - margin.top - margin.bottom;
var x = d3.scaleTime().range([ 0, width ]);
var y = d3.scaleLinear().range([ height, 0 ]);

// dynamically create svg
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// load data and create values I want to use
d3.csv("data.csv", function (csv) {
  var data = csv.map(function (line) {
    return {
      // make sure the value of age is a number
      age: parseInt(line.age),

      // create complete date from different values in the data
      // date consists of the year, month and day the shooting happened
      date: new Date(parseInt(line.year), parseMonth(line.month), parseInt(line.day)),

      // gender is the gender of the victim.
      gender: line.gender.toLowerCase(),

      // ethnicity is the ethnicity of the victim.
      ethnicity: line.raceethnicity.toLowerCase(),
    }
  })
  
  // radius for pieChart
var radius = 150;
// create piechart
var pieSvg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + (1.5 * radius  + margin.left) + "," + (1.5 * radius + margin.top) + ")");

  // define axis based on data from date and age
  x.domain(d3.extent(data, function (d) { return d.date }))
  y.domain(d3.extent(data, function (d) { return d.age }))

  var w = 4

  // select all females and append circles
  svg.selectAll(".female")
    .data(data)
    .enter().append("circle")
    .filter(function (d) { return d.gender === "female" })
    .attr("class", "female")
    .attr("r", w / 2)
    .attr("cx", function (d) { return x(d.date) })
    .attr("cy", function (d) { return y(d.age) })

  // select all males and append rectangles
  svg.selectAll(".male")
    .data(data)
    .enter().append("rect")
    .filter(function (d) { return d.gender === "male" })
    .attr("class", "male")
    .attr("x", function (d) { return x(d.date) - (w / 2) })
    .attr("y", function (d) { return y(d.age) - (w / 2) })
    .attr("width", w)
    .attr("height", w)

  // used to show the months on the x-axis
  var axisBottom = d3.axisBottom(x)
    .tickFormat(d3.timeFormat("%B"))

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(axisBottom)

  svg.append("g")
    .call(d3.axisLeft(y))

  // make an area selectable with mouse selection
  svg.append("g")
    .attr("class", "brush")
    .call(d3.brushX().on("brush", function (evt) {
      var selection = d3.event.selection.map(x.invert)

      var filtered = data.filter(function (el) {
        return selection[0] < el.date && el.date < selection[1]
      })

      drawPie(filtered)
    }))

  // define the colors for the different ethnicities
  var colors = d3.scaleOrdinal([
    "#FFEFD5",
    "#0C150B",
    "#6E2700",
    "#FFFFE0",
    "#CD5C5C",
    "purple"
  ])
  
  // apply colors to ethnicities
  colors.domain([
    "white",
    "black",
    "hispanic/latino",
    "asian/pacific islander",
    "native american",
    "unknown"
  ])

  drawPie(data)
  
  // create piechart based on what you select
  function drawPie (data) {

    // create groups
    var groups = d3.nest()
      .key(function (d) { return d.ethnicity.trim() })
      .rollup(function (d) { return d.length })
      .entries(data)

    var pie = d3.pie()
      .sort(null)
      .value(function (d) { return d.value })
      (groups)

    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(.66  * radius);

    var labelarc = d3.arc()
      .outerRadius(radius + 40)
      .innerRadius(radius + 40);

    var arcs = pieSvg
      .selectAll(".arc")
      .data(pie, function (d) { return d.key })

    // add new arcs
    arcs.enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", function(d) { return colors(d.data.key); })
      .attr("data-name", function(d) { return d.data.key; })

    // update old arcs
    arcs.attr("d", arc)

    // remove old arcs
    arcs.exit().remove()

    var text = pieSvg
      .selectAll(".text")
      .data(pie, function (d) { return d.key })

    // update old arcs
    text.attr("transform", function (d) { return "translate(" + labelarc.centroid(d) + ")" })

    // add new arcs
    text.enter().append("text")
      .attr("class", "text")
      .attr("transform", function (d) { return "translate(" + labelarc.centroid(d) + ")" })
      .text(function (d) { return d.data.key })

    // remove old arcs
    text.exit().remove()

  }
})

// the months of the year, used to parse month strings into integers.
var months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june"
]

// parseMonth parses the month name (like "February") to a number
function parseMonth (name) {
  return months.indexOf(name.toLowerCase())
}
