// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

//skip fight fuction 
var fightOrSkip = function(){
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
    promptFight = promptFight.toLowerCase();

    if (promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max (0, playerInfo.money - 2);
        console.log("playerInfo.money", playerInfo.money);

        return true;
        
      }
  }
  return false; 
}
// fight function
var fight = function(enemy) {
  var isPlayerTurn = true;
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
    // ask player if they'd like to fight or run
    if (fightOrSkip()) {
      break;
    }
    //remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + " has died!");
      
      //award money to winner
      playerInfo.money= playerInfo.money + 20;
      console.log("playerInfo.money", playerInfo.money);
      //leaves while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
    } else{
    // remove players's health by subtracting the amount set in the enemy.attack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
      window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }
  }
  isPlayerTurn = !isPlayerTurn;
}
};
// function to start new game
var startGame = function(){
  //reset player stats
  playerInfo.reset();

// fight each enemy-robot by looping over them and fighting them one at a time
for(var i =0; i < enemyInfo.length; i++){
  console.log(playerInfo);
  //if player still alive fight
  if (playerInfo.health > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemy.names array
      var pickedEnemyObj = enemyInfo[i];

    // reset enemy.health before starting new fight
      pickedEnemyObj.health = randomNumber(40,60);
// pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      //if enemies left call shop function 
      if (playerInfo.health >0 && i < enemyInfo.length -1){
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        // if yes, take them to the store() function
        if (storeConfirm){
          shop();
        }
      }
    }

  // if player isn't alive, stop the game
    else {
      window.alert("You've Lost! Game Over!");
      break;
  }

}
endGame();
};
// end game fuinction definition 
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }
  var highScore = localStorage.getItem("highscore");
  if (highScore === null) {
    highScore = 0;
  }

  // if player has more money than the high score, player has new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem("highscore", playerInfo.money);
    localStorage.setItem("name", playerInfo.name);

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
  } else {
    alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
  }

  // ask player if they'd like to play again
var playAgainConfirm = window.confirm ("Would you like to play again?");

  if (playAgainConfirm){
    startGame();
  }else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};
//shop function definition 
var shop = function(){
  //displays prompt asking player what decision they'd like to make 
var shopOptionPrompt = window.prompt(
  "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
);
shopOptionPrompt = parseInt(shopOptionPrompt);

switch (shopOptionPrompt) {
  case 1:
   playerInfo.refillHealth();
    break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      // do nothing, so function will end
      break;
      default:
        window.alert("You did not pick a valid option. Try again.");

        // call shop() again to force player to pick a valid option
        shop();
        break;
}
};
// function defenition to generate random numeric value

var getPlayerName = function(){
  var name = "";
  
  while (name === "" || name === null){
    name = prompt("What is your robot name?");
  }
  console.log("your robot's name is " + name);
  return name;
};
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 80,
  money: 10,

  reset: function(){
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 5){
      window.alert("Refilling player's health by 20 for 5 dollars.");
      this.health += 20;
      this.money -= 5;
    }else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function(){
    if (this.money >= 3) {
      window.alert("Upgrading player's attack by 6 for 3 dollars.")
      this.attack += 6;
      this.money -= 3;
    }   else{
    window.alert("You don't have enough money!");
    }
  }

};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },

  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },

  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();