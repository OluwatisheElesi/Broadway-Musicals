var express = require('express');
var csv = require('csvtojson');

var csvFilePath = 'Broadway Musicals.csv';
var myArray = [];
csv().fromFile(csvFilePath).then((jsonObj) => {
  myArray = jsonObj;
});

var app = express();

app.get('/', (req, res) => {
  res.send(myArray)
});

app.get('/top-five', (req, res) => {
  myArray.sort(function(a, b) {
    if (Number(b.avg_cost) > Number(a.avg_cost))
      return 1;
    else if (Number(b.avg_cost) < Number(a.avg_cost))
      return -1;
    else
      return 0;
  })
  res.send(myArray.slice(0, 5))
});

app.get('/top-ten-gross', (req, res) => {
  myArray.sort(function(a, b) {
    if (Number(b.gross) > Number(a.gross))
      return 1;
    else if (Number(b.gross) < Number(a.gross))
      return -1;
    else
      return 0;
  })

  //create an array that just has the titles
  var result = myArray.map(function(item) {
    return item.title;
  })
  res.send(result.slice(0, 10))
});

app.get('/get-year/:year', (req, res) => {
  var filteredList = [];
  myArray.forEach(function(item) {
    if (item.year == req.params.year)
      filteredList.push(item);
  });
  res.send(filteredList)
});

app.get('/between-years/:year1/:year2', (req, res) => {
  var filteredList = [];
  myArray.forEach(function(item) {
    if (item.year > req.params.year1 && item.year < req.params.year2)
      filteredList.push(item);
  });
  res.send(filteredList)
});

app.get('/get-titles/', (req, res) => {
  var titles = myArray.map(function(obj) {
    return obj.title;
  });
  res.send(titles)
});

app.get(3000, () => {
  console.log('server started');
});
