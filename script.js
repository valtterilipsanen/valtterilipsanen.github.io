
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
function Person(name, age){
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function(greetingsString){
    var phrase = greetingsString + ", my name is " + this.name;
    console.log(phrase);
  };

Person.prototype.compareAge = function(another){
    var phrase = "My name is " + this.name + " and I'm ";
    if(this.age < another.age){
      phrase = phrase + "younger than " + another.name;
    } else if(this.age > another.age){
      phrase = phrase + "older than " + another.name;
    } else {
      phrase = phrase + "equally young as " + another.name;
    }
    console.log(phrase);
  };

Person.prototype.namesake = function(other){
    var phrase = "We have ";
    var end = other.name + " and I";
    if(this.name == other.name){
      phrase = phrase + "the same name, " + end + "!";
    } else {
      phrase = phrase + "different names, " + end + ".";
    }
    console.log(phrase);
  };




function addPersonMethods(nameAge){
  return new Person(nameAge.name, nameAge.age);
}

var bob_def =  { name: 'Bob', age: 21 };
var eve_def =  { name: 'Eve', age: 21 };

var eve = addPersonMethods(eve_def);
var bob = addPersonMethods(bob_def);
var another_bob = addPersonMethods({name:'Bob', age: 40});

eve.greet("Hi all");
eve.compareAge(bob);
bob.greet("Hello");
eve.namesake(bob);
another_bob.compareAge(eve);
eve.compareAge(another_bob);
another_bob.namesake(bob);


window.onload = function(){
    setNumber(getRandomInteger(minimum, maximum));

};
