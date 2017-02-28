var jsonData = null;
var currentSlide = 0;
var play = true;


window.onload = function(){
    $.getJSON("https://lipsanv1.firebaseio.com/.json", function(data){
        console.log(data);
        jsonData = data;
        $('#slideDate').html(data.articles[0].date);
        $('#slideHeader').html(data.articles[0].title);
        $('#slideText').html(data.articles[0].text);  
    })
}

function nextSlide(){ 
    currentSlide = (currentSlide + 1) % 3;
    $('#slideDate').html(jsonData.articles[currentSlide].date);
    $('#slideHeader').html(jsonData.articles[currentSlide].title);
    $('#slideText').html(jsonData.articles[currentSlide].text);
    var img = null;
    switch(currentSlide){
      case 0 :
        img = "slide0";
        break;
        
        case 1 :
        img = "slide1";
        break;
        
        case 2 : 
        img = "slide2";
        break; 
        
        default:
        break;
    }
    document.getElementById("slideshow").className = img;
       
}

function previousSlide(){
    if(currentSlide === 0){
        currentSlide = 2;
    } else {
      currentSlide = currentSlide - 1 ;
    }
    $('#slideDate').html(jsonData.articles[currentSlide].date);
    $('#slideHeader').html(jsonData.articles[currentSlide].title);
    $('#slideText').html(jsonData.articles[currentSlide].text);         
    var img = null;
    switch(currentSlide){
      case 0 :
        img = "slide0";
        break;
        
        case 1 :
        img = "slide1";
        break;
        
        case 2 : 
        img = "slide2";
        break; 
        
        default:
        break;
    }
    document.getElementById("slideshow").className = img;
}

window.setInterval(function(){if(play)nextSlide()},6000);


