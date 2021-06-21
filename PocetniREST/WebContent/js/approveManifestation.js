
//var rootURL2 = "../PocetniREST/rest/users/getUsers";
var rootURL4 = "../rest/events/odobri";
var rootURL2 = "../rest/events/getOneManifestation";
var eventId=0

findAll();

function findAll() {
	console.log('find manif');
	$.ajax({
		type : 'GET',
		url : rootURL2,
		dataType : "json", //todo ovde fali id
		success : renderList
	});
}

function renderList(data){
	console.log(data)
	document.getElementById("name").value = data.naziv; //preostaloFanpit
	document.getElementById("FanSeetsNumber").value = data.preostaloFanpit;
	document.getElementById("VipSeetsNumber").value = data.preostaloVip;
	document.getElementById("date").value = data.datumPocetka;
	document.getElementById("EndDate").value = data.datumKraja;
	document.getElementById("price").value = data.cenaKarte;
	document.getElementById("type").value = data.tipManifestacije;
	document.getElementById("SeetsNumber").value = data.brojMesta;

}




$(document).ready(function(){
	
	$('#approve').click(function(e){ //btn na koji se klikne
		e.preventDefault();
		
		console.log(document.getElementById("name").value)
		
			$.ajax({
				type : 'POST',
				url : rootURL4, //proveri da li vec postoji
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : document.getElementById("name").value,
				}),
				
				
			
			})
	})
})
