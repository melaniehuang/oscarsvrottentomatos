var oCSV;
var barWidth = 400;
var barHeight = 40;

var canvas;
var showButton;
var hideButton;

var oscarsGold = "#b7a261"

function preload() {
  oCSV = loadTable("/data/oscars.csv", "csv", "header");
  print("Loaded CSV!");  
}

function setup() {
  var totalHeight = barHeight * oCSV.getRowCount();
  canvas = createCanvas(windowWidth, totalHeight);
  canvas.parent('myCanvas');

  //noCanvas();
  
  background(241, 246, 25);
  fill(0);
  noStroke();

  showButton = createButton('Show all');
  showButton.class('show_all');
  showButton.mousePressed(revealAll);

  hideButton = createButton('Hide all');
  hideButton.class('hide_all');
  hideButton.mousePressed(hideAll);
  
  //revealAll();

    
  for (var i = 0; i < oCSV.getRowCount(); i++) {   
      
    var movie = oCSV.getRow(i);

    fill(0);
    noStroke();

    var budget = movie.getString(7)/1000000;
    budget = Math.round(budget*10)/10;

    var won = "";

    if (movie.getString(2) == "W"){
      won = "Winner";
    } else if (movie.getString(2) == "NA") {
      won = "Pending result...";
    } else {
      won = "Nominee";
    }

    var titleP = createP(movie.getString(1) + '  |  ' + movie.getString(0) + ' ' + won + '  |  Won ' + movie.getString(3) + ' / ' + movie.getString(4) + ' oscars  |  US$' + budget + 'm budget  |  ' + Math.round(parseFloat(movie.getString(9))*100) + '% return' , 20, (barHeight*i)+(barHeight/2+5));
    titleP.id("title" + i);
    titleP.class("bar animated fadeIn");
    titleP.parent('myList');
    //titleP.mouseOver(revealOne);

    if (movie.getString(10) == "W"){
      titleP.addClass('bold');
      console.log(movie.getString(1));
    }
  }


  //hide all as default
  // var titles = selectAll('p', '#myList');
  // for (var p = 0; p < titles.length; p++){
  //   titles[p].hide();
  // }

  //render boxes
  for (var i = 0; i < oCSV.getRowCount(); i++) {   
    strokeWeight(1);
    var movie = oCSV.getRow(i);
      
    stroke(0);
    line(0, (barHeight*i), windowWidth, (barHeight*i));
    noStroke();
    renderRatings(movie, i);
  }
}

function revealAll() {
    var titles = selectAll('p', '#myList');
    
    for (var p = 0; p < titles.length; p++){
      titles[p].show();
    }
}

// function revealOne(){
//   var revealIt = selectAll('p', '#myList');

//   for (var p = 0; p < revealIt.length; p++){
//     revealIt[p].hide();
//   }
  
//   var i = round(mouseY/barHeight);
//   console.log(i);
  
//   revealIt[1].show();
// }

function hideAll() {
  var hideTitles = selectAll('p', '#myList');

  for (var p = 0; p < hideTitles.length; p++){
    hideTitles[p].hide();
  }
}

function renderRatings(m, i){
  var critic = m.getNum(5)*100;
  var user = m.getNum(6)*100; //float
  user = user.toFixed(0);
  
  var startingPoint = (windowWidth/100)*user;
  var ratingDiff =  critic - user;
  var circle = false;
  println(user);

  if (ratingDiff < -5 || ratingDiff > 5){
    fill(0);
    var circle = true;
  } else {
    fill(0, 40);
  }

  if (ratingDiff == 0){
    stroke(0, 40);
    strokeWeight(2);
    line(startingPoint, barHeight*i, startingPoint, (barHeight*i)+barHeight);
  } else {
    rect(startingPoint, barHeight*i, (windowWidth/100)*ratingDiff, barHeight);
  }

  if ((circle == true) && (ratingDiff < 0)) {
    strokeWeight(3);
    stroke(0);
    fill(0,255,0);
    ellipse(startingPoint,(barHeight*i)+(barHeight/2),12,12);

    noStroke();
    fill(0);
    text(str(user)+"%", startingPoint +10, (barHeight*i)+(barHeight/2)+4);
  } else if ((circle == true) && (ratingDiff > 0)) {
    strokeWeight(3);
    stroke(0);
    fill(255,0,0);
    ellipse(startingPoint,(barHeight*i)+(barHeight/2),12,12);

    noStroke();
    fill(0);
    text(str(user)+"%", startingPoint - 34, (barHeight*i)+(barHeight/2)+4);
  }

  strokeWeight(1);
}

//var mousePos = round(map(mouseY, 0, 40, -0.5, 0.5));
//titleP.mouseOver(revealOne);


