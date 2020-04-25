const gameContainer = document.getElementById("game");
const clicked = document.querySelector('#total');
var  color1 = undefined;
var  color2 = undefined;
var  color2Div = undefined;
var  color1Div = undefined;
var  count = 0;
var  cardClicked = false;
var  wait = false;
var  matches = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");


    //this adds a data attribute of color to the div
    newDiv.setAttribute('color', color);

    //this adds a data attribute of flipped to false by default
    newDiv.setAttribute('flipped', false);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    
  }
}

// TODO: Implement this function!
function handleCardClick(e) {

  flipped = e.target.getAttribute('flipped');

  //if card not flipped and wait is false (both car flipped)
  if ( flipped  == "false" && !wait) {
    count++;
    clicked.innerText= ("Total Clicked: " + count);
  }

  //first click, if nothing is clicked, no cards are assigned yet, take hidden class off
  if( !wait && color1 === undefined && flipped == 'false' && !cardClicked ){
    color1Div = e.target;
    color1 = e.target.getAttribute('color');
    e.target.style.backgroundColor = color1;
    color1Div = e.target;
    e.target.setAttribute('flipped', true);
    cardClicked = true;
  
   
  }
  //card is clicked so color1 is set so this will be the second card section
    else if(cardClicked && !wait && flipped == 'false' )   {
      color2 = e.target.getAttribute('color');
      color2Div = e.target;
      // e.target.classList.add('temp');

      e.target.style.backgroundColor = color2;
      e.target.setAttribute('flipped', true);
      
  

  // if the cards match: (this doesn't work??)
      if (color1 === color2) {
        matches++
        color1 = undefined;
        color2 = undefined;
        cardClicked = false;

        if (matches == 6){
          alert("Well done it took you " + count +" tries!") ;
        }
      
      }
  // if they don't match, reset the value of both cards
      else  {
        wait = true; // cant click anything else now
        setTimeout(() => {
          color1Div.setAttribute('flipped', false);
          color2Div.setAttribute('flipped', false);
          color1Div.style.backgroundColor = 'white';
          color2Div.style.backgroundColor = 'white';


          color1Div = undefined;
          color2Div = undefined;
          color1 = undefined;
          color2 = undefined;
          cardClicked = false;

          wait = false;

        }, 1000);


      }

    
  }




}

// when the DOM loads
createDivsForColors(shuffledColors);


