let imie = "Andrzej";
let owoc = "Pomarańcze";
let ilosc = 8;

const imiona = ["Jan", "Filip", "Przemysław", "Aleksander", "Maja", "Andrzej"];


function eating(imie, owoc, ilosc){
	if(ilosc > 5){
		console.log(imie + " zjadl duzo " + owoc);
	}
	else{
		console.log(imie + " zjadł mało " + owoc);
	}
}



function longNames(imiona){
	let krotkie = 0;
	console.log("To są długie imiona:");
	for(elem of imiona){
		if(elem.length > 5){
			console.log(elem);
		}
		else{
			krotkie = krotkie + 1;
		}
	}
	console.log(krotkie + " imiona z bazy danych były zbyt krótkie");
}

eating(imie, owoc, ilosc);

longNames(imiona);