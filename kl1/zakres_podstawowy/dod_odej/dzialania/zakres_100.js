// MATMASTER reboot
// by skorupa (c)

function randomize(limit){
  var a = Math.pow(10, String(limit).length); 
  var readyNumber = Math.floor(Math.random()*a);
  if(readyNumber>=limit){
    return randomize(limit);
  } else {
    return readyNumber;
  }
}

function id(ID){
   return document.getElementById(ID);
}

// jakby ktoś nie wiedział: MTMST i mtmst to skróty od MATMASTER
// w *.js skrót pisać wielkimi literami, w *.html - małymi

var MTMST = {};

MTMST._1 = 0; // 1. składnik
MTMST._znak = ""; // znak
MTMST._2 = 0; // 2. składnik

MTMST.znaki = ["+","-"/* ,"*","/" */]; // znaki do wykorzystania
MTMST.tmp = {};
MTMST._dobrepunkty = 0;
MTMST._zlepunkty = 0;

MTMST.fraction = false; // ułamek
MTMST.limit = 100;

MTMST.los_1_2 = function(){
   MTMST.tmp.znak = randomize(MTMST.znaki.length);
   MTMST._znak = MTMST.znaki[MTMST.tmp.znak];
   id("mtmst_znak").innerHTML = MTMST._znak;
   MTMST._1 = randomize(11)*10;
   MTMST._2 = randomize(11)*10;
   
   if(MTMST._znak=="-" && MTMST._1<MTMST._2) MTMST.los_1_2();
   else if(MTMST._znak=="/" && MTMST._1<MTMST._2) MTMST.los_1_2();
   MTMST._znak = MTMST.znaki[MTMST.tmp.znak];
}

MTMST.engine = function(){
	// losowanie działania
   MTMST.los_1_2();
   
   id("mtmst_1").innerHTML = MTMST._1;
   id("mtmst_2").innerHTML = MTMST._2;
   MTMST.rozwiazanie = eval(MTMST._1+MTMST._znak+MTMST._2);
   if(MTMST.rozwiazanie>MTMST.limit) MTMST.engine();
   else if(Math.floor(MTMST.rozwiazanie) != MTMST.rozwiazanie && !MTMST.fraction)
      MTMST.engine();
      
   delete(MTMST.rozwiazanie); // spadaj hakerze XD
}

MTMST.enter = function(eve){
   if(eve.keyCode == 13) MTMST.sprawdz();
}

MTMST.sprawdz = function(){
	MTMST.rozwiazanie = eval(MTMST._1+MTMST._znak+MTMST._2);
	MTMST.wynikUzytkownika = id("mtmst_input").value;
	
	MTMST.wynikUzytkownika = MTMST.wynikUzytkownika.replace(",",".");
   MTMST.wynikUzytkownika = MTMST.wynikUzytkownika.replace(/ /g,"");
   
	Number(MTMST.wynikUzytkownika);
	String(MTMST.wynikUzytkownika);
	if(MTMST.rozwiazanie != MTMST.wynikUzytkownika || id("mtmst_input").value=="") {
		// zle
		id("dobrze").style.display = "none";
		id("zle").style.display = "block";
		id("rozwiazanie").innerHTML = MTMST.rozwiazanie;
		MTMST._zlepunkty++;
		id("zlepunkty").innerHTML=MTMST._zlepunkty;
		MTMST.engine();
	} else {
		// dobrze
		id("zle").style.display = "none";
		id("dobrze").style.display = "block";
		MTMST._dobrepunkty++;
		id("dobrepunkty").innerHTML=MTMST._dobrepunkty;
		MTMST.engine();
	}
	id("mtmst_input").value="";
	delete(MTMST.wynikUzytkownika);
}

setInterval(function(){
	id("dobrepunkty").innerHTML=MTMST._dobrepunkty;
	id("zlepunkty").innerHTML=MTMST._zlepunkty;
},1000);

setInterval(function(){
	document.body.setAttribute("onerror","document.body.innerHTML = 'ERROR: prawdopodobnie hakowanie'");
},2000);