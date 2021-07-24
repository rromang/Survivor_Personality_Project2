var width = 960,
    height = 480;

var projection = d3.geoEquirectangular()
    .scale(height / Math.PI)
    .translate([width / 2, height / 2]);

var path = d3.geoPath()
    .projection(projection);

var graticule = d3.geoGraticule();

var svg = d3.select("#home-state").append("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json("/mbostock/raw/4090846/world-50m.json", function(error, world) {
  if (error) throw error;

  svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);

});

d3.json("castaways.json", function(data) {
  svg.selectAll(".pin")
    .data(data)
    .enter().append("circle", ".pin")
    .attr("r", 5)
    .attr("transform", function(d) {
    return "translate(" + projection([
        d.Lon,
        d.Lat
    ]) + ")";

});
});