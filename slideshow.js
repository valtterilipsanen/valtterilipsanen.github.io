var jsonData = null;
if (localStorage.currentSlide) {
    localStorage.currentSlide = Number(localStorage.currentSlide);
} else {
    localStorage.currentSlide = 0;
}

window.onload = function(){
    $.getJSON("https://lipsanv1.firebaseio.com/.json", function(data){
        console.log(data);
        jsonData = data;
        $('#slideDate').html(data.articles[localStorage.currentSlide].date);
        $('#slideHeader').html(data.articles[localStorage.currentSlide].title);
        $('#slideText').html(data.articles[localStorage.currentSlide].text);
        document.getElementById("slideshow").style.backgroundImage = jsonData.articles[localStorage.currentSlide].image;
    })
}

var play = window.setInterval(function(){nextSlide()},6000);

function nextSlide(){ 
    localStorage.currentSlide = (localStorage.currentSlide + 1) % 3;
    $('#slideDate').html(jsonData.articles[localStorage.currentSlide].date);
    $('#slideHeader').html(jsonData.articles[localStorage.currentSlide].title);
    $('#slideText').html(jsonData.articles[localStorage.currentSlide].text);
    document.getElementById("slideshow").style.backgroundImage = jsonData.articles[localStorage.currentSlide].image;
    console.log(jsonData.articles[localStorage.currentSlide].image)
}

function previousSlide(){
    if(localStorage.currentSlide == 0){
        localStorage.currentSlide = 2;
    } else {
      localStorage.currentSlide = localStorage.currentSlide - 1 ;
    }
    $('#slideDate').html(jsonData.articles[localStorage.currentSlide].date);
    $('#slideHeader').html(jsonData.articles[localStorage.currentSlide].title);
    $('#slideText').html(jsonData.articles[localStorage.currentSlide].text);  
    document.getElementById("slideshow").style.backgroundImage = jsonData.articles[localStorage.currentSlide].image;
}

function togglePlay(){
  if(document.getElementById("playButton").innerHTML == "Pysäytä") {
      clearInterval(play);
      document.getElementById("playButton").innerHTML = "Käynnistä";
  } else {
      play = window.setInterval(function(){nextSlide()},6000); 
      document.getElementById("playButton").innerHTML = "Pysäytä";
  }
}




