class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(whiteCar);
    car2 = createSprite(300,200);
    car2.addImage(redCar);
    car3 = createSprite(500,200);
    car3.addImage(blueCar);
    car4 = createSprite(700,200);
    car4.addImage(blackCar);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground);
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      //index of the array
      var index = 0;
      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + (index*200) + allPlayers[plr].xPos;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        
        fill("Green");
        textSize(15);
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);

        if (index === player.index){
          fill("Red");
          ellipse(x, y, 70, 70)
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index - 1].y;
          if(cars[index - 1].isTouching(rocks)){
          yVel -= 0.9;  
          }
        }
      }
    }

    
    if(player.distance < 4375){
    //38 = Up Arrow Key (UP_ARROW)
    if(keyIsDown(38) && player.index !== null){
      //player.distance +=10
      //player.update();
      yVel += 0.9;
      //37 = Left Arrow Key
      if(keyIsDown(37)){
      xVel -= 0.2;
      }
      //39 = Right Arrow Key
      if(keyIsDown(39)){
      xVel += 0.2;
      }
      else if(keyIsDown(38) && yVel > 0 && player.index !== null){
      yVel -= 0.1;
      xVel *= 0.9;
      }
      else{
      yVel *= 0.985;
      xVel *= 0.985;
      }
     }
     player.distance += yVel;
     yVel *= 0.98;
     player.xPos += xVel;
     xVel *= 0.985;
     player.update();
 
     drawSprites();
    }
  }

  end(){
  console.log("The Game has Ended");
  }
}
