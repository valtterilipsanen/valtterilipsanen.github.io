var jsonData = null;
if (localStorage.currentSlide) {
    localStorage.currentSlide = Number(localStorage.currentSlide);;
} else {
    localStorage.currentSlide = 0;
}

window.onload = function(){
    $.getJSON("https://lipsanv1.firebaseio.com/.json", function(data){
        console.log(data);
        jsonData = data;
        $("#slideImg").attr("src",jsonData.pics[0].url);
        $("#slideImg").attr("src",jsonData.pics[1].url);
        $("#slideImg").attr("src",jsonData.pics[2].url);
        $("#slideImg").attr("src",jsonData.pics[3].url);
        $("#slideshow").slideUp(1000, function(){

            $('#slideHeader').html(data.pics[Number(localStorage.currentSlide)].title);
            $("#slideImg").attr("src",jsonData.pics[localStorage.currentSlide].url);
            document.getElementById("slideshow").style.height = "700px";
            $("#slideshow").slideDown(1000);
    });
    });
};

var play = window.setInterval(function(){
    nextSlide();
},5000);



function nextSlide(){

    $("#slideshow").slideUp(1000, function(){
        localStorage.currentSlide = (Number(localStorage.currentSlide) + 1) % 4;
        $('#slideHeader').html(jsonData.pics[localStorage.currentSlide].title);
        $("#slideImg").attr("src",jsonData.pics[localStorage.currentSlide].url);
        $("#slideshow").slideDown(1000);
    });
}

function previousSlide(){
    if(localStorage.currentSlide == 0){
        localStorage.currentSlide = 3;
    } else {
      localStorage.currentSlide = localStorage.currentSlide - 1 ;
    }
    $("#slideshow").slideUp(1000, function(){
        $('#slideHeader').html(jsonData.pics[localStorage.currentSlide].title);
        $("#slideImg").attr("src",jsonData.pics[localStorage.currentSlide].url);
        $("slideshow").slideDown("slow", function(){});
        $("#slideshow").slideDown(1000);
    });
}

function togglePlay(){
  if(document.getElementById("playButton").innerHTML == "Pysäytä") {
      clearInterval(play);
      document.getElementById("playButton").innerHTML = "Käynnistä";
  } else {
      play = window.setInterval(function(){
          nextSlide();
      },5000);
      document.getElementById("playButton").innerHTML = "Pysäytä";
  }
}
