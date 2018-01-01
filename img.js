var socketIMG = io.connect('http://82.146.62.225:3033');


socketIMG.on('whuN', function () {
   socketIMG.emit("whuS");
});


socketIMG.on('whu', function (value) {
  in2IMG.innerHTML ="";
//in2.innerHTML =JSON.stringify(value);
 value.map(el=>{
 var divE = document.createElement('div');
 var divp = document.createElement('span');
 var divA = document.createElement('a');
 
 
 divp.innerHTML ="<br> "+el.str+"="+el.http+"="+el._id+"<br> ";
 divA.target="_blank";
 divA.href=el.http;
 
 var divI = document.createElement('img');
 divI.src = el.src;
 divA.appendChild(divI);
 
 divE.appendChild(divp);
 divE.appendChild(divA);
 in2IMG.appendChild(divE);
 });//map
 
 
});
