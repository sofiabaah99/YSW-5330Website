// https://p5js.org/reference/

// Delare variable table, with global scope
let table;
let counts = 300;
let countries = [];
let slider;
var T = 150;
var t = 0;
var tdelta = T/5;
var Ascale = -280;
let move = 0;
var CircleSizeScale = 1;
var unitdefault = 1000; //tonnses
var unitfoodcapita = 1; //kg/capita/year
let startX; // 鼠标按下时的y坐标
let draggedDistance; // 鼠标拖动的距离
let year_now = 1978;
let foodName_now = 'apples';
// let selectedCountry = null;


// let input_csvfile_food = "milk";
// let input_csvfile_element = "Production";
// let input_csvfile = input_csvfile_food + ".csv";
let FoodNames_list = ['apples', 'bananas', 'beer', 'bovine_meat', 'cocoa_beans', 'coconut_oil', 'coffee', 'eggs', 'fish_seafood', 'maize', 'milk', 'oats', 'offals_edible', 'oliver_oil', 'pepper', 'pigmeat', 'plantains', 'potatoes', 'rice', 'sorghum', 'sweet_potatoes', 'tea', 'tomatoes', 'wheat'];




function preload() {
  // my table is comma separated value "csv"
  // and has a header specifying the columns labels
  table_apples= loadTable('fooddata/dataprocessed3/apples.csv', 'csv', 'header');
  table_bananas= loadTable('fooddata/dataprocessed3/bananas.csv', 'csv', 'header');
  table_beer= loadTable('fooddata/dataprocessed3/beer.csv', 'csv', 'header');
  table_bovine_meat= loadTable('fooddata/dataprocessed3/bovine_meat.csv', 'csv', 'header');
  table_cocoa_beans= loadTable('fooddata/dataprocessed3/cocoa_beans.csv', 'csv', 'header');
  table_coconut_oil= loadTable('fooddata/dataprocessed3/coconut_oil.csv', 'csv', 'header');
  table_coffee= loadTable('fooddata/dataprocessed3/coffee.csv', 'csv', 'header');
  table_eggs= loadTable('fooddata/dataprocessed3/eggs.csv', 'csv', 'header');
  table_fish_seafood= loadTable('fooddata/dataprocessed3/fish_seafood.csv', 'csv', 'header');
  table_maize= loadTable('fooddata/dataprocessed3/maize.csv', 'csv', 'header');
  table_milk= loadTable('fooddata/dataprocessed3/milk.csv', 'csv', 'header');
  table_oats= loadTable('fooddata/dataprocessed3/oats.csv', 'csv', 'header');
  table_offals_edible= loadTable('fooddata/dataprocessed3/offals_edible.csv', 'csv', 'header');
  table_oliver_oil= loadTable('fooddata/dataprocessed3/oliver_oil.csv', 'csv', 'header');
  table_pepper= loadTable('fooddata/dataprocessed3/pepper.csv', 'csv', 'header');
  table_pigmeat= loadTable('fooddata/dataprocessed3/pigmeat.csv', 'csv', 'header');
  table_plantains= loadTable('fooddata/dataprocessed3/plantains.csv', 'csv', 'header');
  table_potatoes= loadTable('fooddata/dataprocessed3/potatoes.csv', 'csv', 'header');
  table_rice= loadTable('fooddata/dataprocessed3/rice.csv', 'csv', 'header');
  table_sorghum= loadTable('fooddata/dataprocessed3/sorghum.csv', 'csv', 'header');
  table_sweet_potatoes= loadTable('fooddata/dataprocessed3/sweet_potatoes.csv', 'csv', 'header');
  table_tea= loadTable('fooddata/dataprocessed3/tea.csv', 'csv', 'header');
  table_tomatoes= loadTable('fooddata/dataprocessed3/tomatoes.csv', 'csv', 'header');
  table_wheat= loadTable('fooddata/dataprocessed3/wheat.csv', 'csv', 'header');  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight*1.1);
  background(0, 0, 0, 255*0.8);
  canvas.parent('p5canvas');
  angleMode(DEGREES);

  slider = createSlider(1960, 2019, year_now);
  slider.position(windowWidth/2-250, 710);
  slider.style('width', '500px');
  slider.parent('p5canvas');

  sliderscaleadjust = createSlider(0, 2000, CircleSizeScale*100);
  sliderscaleadjust.position(windowWidth/2+140, 215);
  sliderscaleadjust.style('width', '550px');
  sliderscaleadjust.parent('p5canvas');

  // create select box
  sel = createSelect();
  sel.position(windowWidth/2-50,150);
  sel.id('foodName');
  sel.parent('p5canvas');
  // create select box options
  for(let i=0; i<FoodNames_list.length; i++) {
    sel.option(FoodNames_list[i]);
  }

  createCountries();
}

function draw() {
  // createCanvas(windowWidth, windowHeight*1.4);
  clear();
  background(0, 0, 0, 255*0.8);

  let scale_get = sliderscaleadjust.value();
  CircleSizeScale = map(scale_get, 0, 2000, 0, 20);
  
  // 使用鼠标的位置来设置圆的位置
  push();
  fill(255, 255, 255,30); 
  noStroke(); // 不绘制边框
  ellipse(mouseX, mouseY, CircleSizeScale*20, CircleSizeScale*20); // 在鼠标的位置画一个直径为50的圆
  pop();

  // 如果鼠标接近屏幕右侧，内容向左移动
  if (mouseX > width * 0.80 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move -= 3;
  }
  // 如果鼠标接近屏幕左侧，内容向右移动
  if (mouseX < width * 0.20 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move += 3;
  }

  if (mouseX > width * 0.90 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move -= 7;
  }
  // 如果鼠标接近屏幕左侧，内容向右移动
  if (mouseX < width * 0.10 && mouseY > height*0.2 && mouseY < windowHeight*1) {
    move += 7;
  }
  
  // // triangle: 
  // push();
  // noStroke();
  // fill(255, 255, 255,50); 
  // // (righttop,Start,rightbtm);
  // let triangleStartX = windowWidth*0.7-120;
  // let triangleStartY = windowHeight*0.05;
  // let triangleSide12X = triangleStartX+500;
  // let triangleSide1Y = triangleStartY;
  // let triangleSide2Y = triangleStartY +30;  
  // triangle(triangleSide12X , triangleSide1Y, triangleStartX, triangleStartY, triangleSide12X , triangleSide2Y); 
  // pop();

  ifcreateCountries ();
  drawlegend ();
  
  // noLoop();
}


// function mousePressed() {
//   for (let i = 0; i < countries.length; i++) {
//     if (countries[i].contains(mouseX, mouseY)) {
//       if (selectedCountry != null) {
//         selectedCountry.deselect();
//         selectedCountry = null;
//       } else {
//       selectedCountry = countries[i];
//       console.log (selectedCountry);
//       selectedCountry.select();
//       break;
//       }
//     }
//   }
// }

// function mousePressed() {
//   // 当鼠标按下时，记录y坐标
//   startX = mouseX;
// }

// function mouseDragged() {
//   draggedDistance = mouseX - startX;
//   // 使用鼠标的垂直位置来调整大小
//   if (mouseX > width*0.7 && mouseY < height*0.3) {
//     CircleSizeScale = map(draggedDistance, 0, 200, 0, 10);
//   }
// }

function doubleClicked() {
  CircleSizeScale = 1;
  sliderscaleadjust.value(100);
}

function createCountries() {
  let year_get = slider.value();
  let foodName_get = sel.value();

  countries = [];
  t = 0;
  
  tablex = eval('table_' + foodName_get);
  let table2 = tablex.matchRows(year_get, 'Year');
  if (table2.length == 0) {
    console.log('Opp..there is no data');
    let country = new Country(600, -100, "Opp..there is no data", 5000, 5000, 0, 0, 0);
    countries.push(country);
  }
  if (table2.length > counts) {
    for (let r = 0; r < counts; r++) {
      let name = table2[r].getString('CountryorArea');
      var ifcellempty = table2[r].getString('Production');
      var production = ifcellempty ? table2[r].getNum('Production') : 0;
      var ifcellempty = table2[r].getString('Domestic supply quantity');
      var domsly = ifcellempty ? table2[r].getNum('Domestic supply quantity') : 0;
      var ifcellempty = table2[r].getString('Food');
      var food = ifcellempty ? table2[r].getNum('Food') : 0;
      var ifcellempty = table2[r].getString('Food supply quantity (kg/capita/yr)');
      var foodcapita = ifcellempty ? table2[r].getNum('Food supply quantity (kg/capita/yr)') : 0;
      var ifcellempty = table2[r].getString('Processing');
      var processing = ifcellempty ? table2[r].getNum('Processing') : 0;
  
      let x = t+move;
      let y = Ascale*sin(360/T*t);
  
      // Create new instance of country
      let country = new Country(x, y, name, production, domsly, food, foodcapita, processing);
  
      // Create a list of country objects
      countries.push(country);
      t += tdelta;
    }
  }
  if (table2.length <= counts) {
    for (let r = 0; r < table2.length; r++) {
      let name = table2[r].getString('CountryorArea');
      var ifcellempty = table2[r].getString('Production');
      var production = ifcellempty ? table2[r].getNum('Production') : 0;
      var ifcellempty = table2[r].getString('Domestic supply quantity');
      var domsly = ifcellempty ? table2[r].getNum('Domestic supply quantity') : 0;
      var ifcellempty = table2[r].getString('Food');
      var food = ifcellempty ? table2[r].getNum('Food') : 0;
      var ifcellempty = table2[r].getString('Food supply quantity (kg/capita/yr)');
      var foodcapita = ifcellempty ? table2[r].getNum('Food supply quantity (kg/capita/yr)') : 0;
      var ifcellempty = table2[r].getString('Processing');
      var processing = ifcellempty ? table2[r].getNum('Processing') : 0;
  
      let x = t+move;
      let y = Ascale*sin(360/T*t);
  
      // Create new instance of country
      let country = new Country(x, y, name, production, domsly, food, foodcapita, processing);
  
      // Create a list of country objects
      countries.push(country);
      t += tdelta;
    }
  }

  year_now = year_get;
  foodName_now = foodName_get;
}

function ifcreateCountries () {
  push();
  let year_get = slider.value();
  // let foodName_get = sel.value();
  // if (year_get != year_now) {
  //   text("Changing",120,120);
  //   createCountries();
  // } 
  // else {
  //   if (foodName_now != foodName_get) {
  //     createCountries();
  //   }
  //   else {
  //     text("Nochange",120,120);
  //   }
  //   text("Nochange",120,120);
  // }
  createCountries();

  // Show the year now
  push();
  textAlign(CENTER,CENTER);
  fill(250,250,250);
  textSize(36);
  rectMode(CENTER);
  text (year_get, windowWidth/2+310, 655-131.6);
  pop ();

  // Show the unit
  let unitnow = unitdefault/CircleSizeScale;
  let unitfoodcapitanow =unitfoodcapita/CircleSizeScale/20;
  push();
  textAlign(LEFT,TOP);
  fill(250,250,250);
  textSize(10);
  rectMode(CENTER);
  text("Unit of Food Production, Domestic Supply Quantity, Food Used for Processing and Food Used for Food is: "+unitnow+" tonnes",windowWidth/2+280,55,300);
  text("Unit of Food Supply Quantity is: "+unitfoodcapitanow+" kg/capita/year",windowWidth/2+280+310,55,300);
  pop();

  translate(windowWidth/13, windowHeight/2+50);
  if (countries.length > counts) {
    for (let i = 0; i < counts; i++) {
      countries[i].display();
    }
  }
  else {
    for (let i = 0; i < countries.length; i++) {
      countries[i].display();
    }
  }
  pop();
}

function drawlegend() {
  let x = 60;
  let y = 40;
  let name = 'Example Country';
  let production = 2500;
  let domsly = 2500; 
  let food = domsly *0.7;
  let processing = domsly *0.3;
  let foodcapita = 18; 
  countryexample = new Country (x, y, name, production, domsly, food, foodcapita, processing);
  countryexample.displaylegend();
}