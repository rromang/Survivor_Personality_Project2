
// from: https://www.d3-graph-gallery.com/graph/wordcloud_size.html
var url = "/api/castaways.json";
d3.json(url, function (response) {
    console.log(response)
});
// List of words
// var allWords = [];
// var myWordsSize = [];
// d3.json("castaways.json", function(data) {
//     // console.log(data.castaways);
//     var castaways = data.castaways;
//     // console.log(castaways);
//     // var personality = castaways.personality_name;
//     // console.log(personality);
//     for (var i = 0; i < castaways.length; i++) {
//      var personality = castaways[i].personality_name;
//     //  console.log(personality);
//      allWords.push(personality)
//     }
  
// console.log(allWords);

// // followed example in: https://stackoverflow.com/questions/48435191/how-do-i-build-an-object-counting-occurrences-in-an-array-in-javascript
// var myWords = {};
// for (var i = 0; i < allWords.length; i++) {
//   if (myWords.hasOwnProperty(allWords[i])) {
//     myWords[allWords[i]] += 1;
//   } else {
//     myWords[allWords[i]] = 1;
//   }
// }
// // console.log(myWords);
// var myWordsarr = Object.keys(myWords).map(function (key){
//   return[key, myWords[key]];
// });
// console.log(myWordsarr);



// var myWordsNew = [];
// var fill = d3.scale.category20();
// var myWordColors = ['#FFE105', '#FF9900', '#7CFC00', '#48D1CC', '#A7FC00', '#FF7518', '#FFD700', '#E41B17', '#00A693', '#DFFF00', '#99FFFF', '#F400A1', '#FF4F00', '#7515D4', '#FFAA00', '#FFFF00', '#3366FF'];
// for (var j = 1; j < myWordsarr.length; j++) {
//   var addDict = {};
//   addDict["word"] = myWordsarr[j][0];
//   addDict["size"] = myWordsarr[j][1];
//   addDict["color"] = myWordColors[j];
//   console.log(addDict);
//   myWordsNew.push(addDict);
// }
// console.log(myWordsNew);


// // set the dimensions and margins of the graph
// var margin = {top: 10, right: 10, bottom: 10, left: 10},
//     width = 450 - margin.left - margin.right,
//     height = 450 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#word-cloud").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// // Wordcloud features that are different from one word to the other must be here
// var layout = d3.layout.cloud()
//   .size([width, height])
//   .words(myWordsNew.map(function(d) { return {text: d.word, size:d.size}; }))
//   .padding(5)        //space between words
//   .rotate(function() { return ~~(Math.random() * 2) * 90; })
//   .fontSize(function(d) { return d.size; })      // font size of words
//   // .style("font-size", function(d) { return Math.min(2 * r, (2 * r - 8) / this.getComputedTextLength() * 24) + "px"; })
//   .on("end", draw);
// layout.start();
var allWords = [];
var myWordsSize = [];
d3.json(url, function (response){
    var data = response
    // console.log(data.castaways);
    var castaways = data.castaways;
    // console.log(castaways);
    // var personality = castaways.personality_name;
    // console.log(personality);
    for (var i = 0; i < castaways.length; i++) {
     var personality = castaways[i].personality_name;
    //  console.log(personality);
     allWords.push(personality)
    }
  
console.log(allWords);

// followed example in: https://stackoverflow.com/questions/48435191/how-do-i-build-an-object-counting-occurrences-in-an-array-in-javascript
var myWords = {};
for (var i = 0; i < allWords.length; i++) {
  if (myWords.hasOwnProperty(allWords[i])) {
    myWords[allWords[i]] += 1;
  } else {
    myWords[allWords[i]] = 1;
  }
}
// console.log(myWords);
var myWordsarr = Object.keys(myWords).map(function (key){
  return[key, myWords[key]];
});
console.log(myWordsarr);



var myWordsNew = [];
var fill = d3.scale.category20();
var myWordColors = ['#FFE105', '#FF9900', '#7CFC00', '#48D1CC', '#A7FC00', '#FF7518', '#FFD700', '#E41B17', '#00A693', '#DFFF00', '#99FFFF', '#F400A1', '#FF4F00', '#7515D4', '#FFAA00', '#FFFF00', '#3366FF'];
for (var j = 1; j < myWordsarr.length; j++) {
  var addDict = {};
  addDict["word"] = myWordsarr[j][0];
  addDict["size"] = myWordsarr[j][1];
  addDict["color"] = myWordColors[j];
  console.log(addDict);
  myWordsNew.push(addDict);
}
console.log(myWordsNew);


// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#word-cloud").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWordsNew.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(5)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  // .style("font-size", function(d) { return Math.min(2 * r, (2 * r - 8) / this.getComputedTextLength() * 24) + "px"; })
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
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
    }
  });