
// from: https://www.d3-graph-gallery.com/graph/wordcloud_size.html

// List of words
var myWords = [];
var myWordsSize = [];
d3.json("castaways.json", function(error, data) {
    // console.log(data);
    var words = d3.set(data.map(function(d) { return d.personality_name; })).values();
    // console.log(words);
    for (i = 1; i < 16; i++) {
      // console.log(words[i]);
    myWords.push(words[i])};
    // var unique = d3.set(personality_names).values();
    // console.log(unique)
});

console.log(myWords);
var wordCount = [];
d3.json("castaways.json", function(error, data) {
var words = d3.set(data.map(function(d) { return d.personality_name; })).values();
// wordToCount.push(words)
for (var i=0; i < words.length; i++){
  var currentWord = words[i];
  for (var k=0; k < myWords.length; i++){
    var counter = [];
    var j = 0;
    if (myWords[k] == currentWord[i]);
    counter += 1
  }
  wordCount.push(counter)
}
});
console.log(wordCount);
// var myWordsSize = d3.count(wordToCount, d => +d);
// console.log(myWordsSize);



// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size; })
        .style("fill", "#69b3a2")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }