
var randomNumber = 0;
var minimum = parseInt(1);
var maximum = parseInt(10);

function getRandomInteger( min, max ){
    var difference = max - min;
    
    var number = parseInt(Math.round(Math.random() * difference + min));
    
    return number;
}

function setNumber(number){
    randomNumber = number;
}

function compareNumber( first, second ){
    setNumber(getRandomInteger(minimum, maximum));
    return(first == second);
}

function guessTheNumber(){
    var number = Number(document.getElementById("number").value);
    
    if(Number.isInteger(number) && (number >= minimum && number <= maximum)){ 
        if(compareNumber(number, randomNumber)){
         window.alert("You guessed right!");
        } else {
         window.alert("You guessed wrong!");   
        }
    } else {
         window.alert("Given number is invalid"); 
    }   
}
 

window.onload = function(){
    setNumber(getRandomInteger(minimum, maximum));
};



