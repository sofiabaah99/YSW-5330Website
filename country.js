// arc: https://vimsky.com/examples/usage/p5-js-arc-function.html

class Country {
    constructor(x, y, Name, Production, Domsly, Food, FoodCapita, Processing) {
      this.x = x;
      this.y = y;
      this.name = Name;
      this.production = Production || 0;
      this.domsly = Domsly || 0;
      this.food = Food || 0;
      this.processing = Processing || 0;
      this.foodcapita = FoodCapita || 0;
      // this.selected = false;
    }

    getName(){
      return this.name;
    }

    display(){
      // circleSize_production: 
      // let circleSize_production = map(this.production,1000,8500000,20,500);
      let circleSize_production = sqrt(this.production*CircleSizeScale);
      push();
      fill(242,206,62,230);
      noStroke();
      circle(this.x+10, this.y+10, circleSize_production);
      pop();

      // circleSize_domsly: 
      let circleSize_domsly = sqrt(this.domsly*CircleSizeScale);
      push();
      fill(71,165,119,180);
      noStroke();
      circle(this.x, this.y, circleSize_domsly);
      pop();

      // circleSize_foodcapita: 
      let circleSize_foodcapita = sqrt(this.foodcapita*CircleSizeScale*20);
      push();
      fill(219, 61, 61, 230);
      noStroke();
      circle(this.x+40, this.y-20, circleSize_foodcapita);
      pop();

      // arcAngle_food: 
      let arcAngle_food = map(this.food, 0, this.domsly, 0, 360);
      push();
      strokeWeight(5);
      stroke(252,103,49,230);
      fill(0, 0, 0, 0);
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, 0, arcAngle_food, OPEN);
      pop();

      // arcAngle_processing: 
      let arcAngle_processing = map(this.processing, 0, this.domsly, 0, 360);
      push();
      strokeWeight(5);
      stroke(0,255,130,230);
      fill(0, 0, 0, 0);
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, arcAngle_food, arcAngle_food + arcAngle_processing, OPEN);
      pop();

      // draw the country circle: 
      push();
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(14);
      rectMode(CENTER);
      // text(this.name + '\n' + this.production +'Production', this.x, this.y);
      text(this.name, this.x+50, this.y+50, 150);
      pop ();
    }

    displaylegend() {
      // circleSize_production: 
      // let circleSize_production = map(this.production,1000,8500000,20,500);
      let i = 100;
      let v = 40;
      let w = 80;
      let circleSize_production = sqrt(this.production);
      push();
      fill(242,206,62,230);
      noStroke();
      circle(this.x+i*3, this.y, circleSize_production);
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(10);
      rectMode(CENTER);
      text('Production', this.x+i*3, this.y+v, w);
      pop();

      // circleSize_domsly: 
      let circleSize_domsly = sqrt(this.domsly);
      push();
      fill(71,165,119,180);
      noStroke();
      circle(this.x+i*2, this.y, circleSize_domsly);
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(10);
      rectMode(CENTER);
      text('Domestic Supply Quantity', this.x+i*2, this.y+v, w);
      pop();

      // circleSize_foodcapita: 
      let circleSize_foodcapita = sqrt(this.foodcapita*20);
      push();
      fill(219, 61, 61, 230);
      noStroke();
      circle(this.x+15+i*4, this.y-10, circleSize_foodcapita);
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(10);
      rectMode(CENTER);
      text('Supply Quantity per Capita', this.x+i*4, this.y+v, w);
      pop();

      // arcAngle_food: 
      let arcAngle_food = map(this.food, 0, this.domsly, 0, 360);
      push();
      strokeWeight(5);
      stroke(252,103,49,230);
      fill(0, 0, 0, 0);
      arc(this.x+i, this.y, circleSize_domsly, circleSize_domsly, 0, arcAngle_food, OPEN);
      pop();
      push();
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(10);
      rectMode(CENTER);
      text('Food Used for Eating', this.x+i, this.y+v, w);
      pop();

      // arcAngle_processing: 
      let arcAngle_processing = map(this.processing, 0, this.domsly, 0, 360);
      push();
      strokeWeight(5);
      stroke(0,255,130,230);
      fill(0, 0, 0, 0);
      arc(this.x, this.y, circleSize_domsly, circleSize_domsly, arcAngle_food, arcAngle_food + arcAngle_processing, OPEN);
      pop();
      push();
      textAlign(CENTER,CENTER);
      fill(250,250,250);
      textSize(10);
      rectMode(CENTER);
      text('Food Used for Processing', this.x, this.y+v, 120);
      pop();

      // // draw the country circle: 
      // push();
      // textAlign(CENTER,CENTER);
      // fill(250,250,250);
      // textSize(14);
      // rectMode(CENTER);
      // // text(this.name + '\n' + this.production +'Production', this.x, this.y);
      // text(this.name, this.x+50, this.y+50, 150);
      // pop ();



    }

    // contains(px, py) {
    //   let d = dist(px, py, this.x, this.y);
    //   return d < 50;
    // }

    // select() {
    //   this.selected = true;
    // }
  
    // deselect() {
    //   this.selected = false;
    // }
}