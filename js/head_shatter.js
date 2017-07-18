var audioSrc = ctx.createMediaElementSource(myAudio);
var analyser = ctx.createAnalyser();

audioSrc.connect(analyser);
analyser.connect(ctx.destination);

var frequencyData = new Uint8Array(analyser.frequencyBinCount);


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
(function animloop(){
  requestAnimFrame(animloop);
   run();
})();



function run() {
    frenquencies = frequencyData.slice(0);
    analyser.getByteFrequencyData(frequencyData);
    intensity = (frenquencies[7]/255) * 150;
    shatterHead(intensity);

}

