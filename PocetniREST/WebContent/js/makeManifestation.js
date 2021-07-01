var rootURL = "../rest/events/add";
//var rootURL2 = "../PocetniREST/rest/users/getUsers";
var rootURL4 = "../rest/events/exists";
var rootURL1 = "../rest/salesmen/getCurrentSalesmen";
//TODO datumi,zatim ono da iskoci kada se doda, i popraviti dugmice

var graphic=null;
var slikaString='';
var road=""
var city=""
var postcode=""
var numberHause=""


$(document).ready(function(){
	
		var gsirina = 0;
		var gduzina = 0;
		
		map.on('click', function (evt) { 
			var lonlat  = ol.proj.toLonLat(evt.coordinate).map(function(val) {
			  return val.toFixed(6);
			});
			gsirina = lonlat[1];//lat
			gduzina = lonlat[0];//lon
			var lon = document.getElementById('lon').value = lonlat[0];
			var lat = document.getElementById('lat').value = lonlat[1];
			
			simpleReverseGeocoding(document.getElementById('lon').value, document.getElementById('lat').value);
			
			var layer = new ol.layer.Vector({
				source: new ol.source.Vector({
					features: [
						new ol.Feature({
							geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
						})
					]
				})
			});
			if(graphic != null){
				map.removeLayer(graphic);			
			}
			graphic = layer;
			map.addLayer(layer);
	
		})
	
		
		document.getElementById('reversegeocoding').addEventListener('click', function(e) {
			if (document.getElementById('lon').value && document.getElementById('lat').value) {
			  simpleReverseGeocoding(document.getElementById('lon').value, document.getElementById('lat').value);
			}
		  });
	
		$('#resetLocation').click(function(e){
			gsirina = 0;//lat
			gduzina = 0;//lon
			document.getElementById('lon').value = 0;
			document.getElementById('lat').value = 0;
			document.getElementById('address').innerHTML = " ";
			if(graphic != null){
				map.removeLayer(graphic);			
			}
		})



	$('#addM').click(function(e){ //btn na koji se klikne
		console.log(gduzina)
		console.log(gsirina)
		e.preventDefault();
		
		var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
	
		//TODOOproveri ovu proveru sa date
		if($("input[name=date]").val() != null  && $("input[name=EndDate]").val() != null && $("input[name=VipSeetsNumber]").val() != null
				&& d!=null && $("input[name=name]").val() != null && $("input[name=FanSeetsNumber]").val() != null
				&& $("input[name=price]").val() != null && $("input[name=SeetsNumber]").val() != null  && $("input[name=type]").val() != null){
					if( (Date.parse(strDate) < Date.parse($("input[name=date]").val())) && Date.parse($("input[name=date]").val())<= Date.parse($("input[name=EndDate]").val()) ){
			
			var id = $("input[name=name]").val();
			 var username;
			$.ajax({
				type : 'POST',
				url : rootURL4, //proveri da li vec postoji
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : id,
				}),
				
				success : function(result){
					$.ajax({
						type : 'GET',
						url : rootURL1,
						dataType : "json",
						success : function(result1){username=result1.korisnickoIme;console.log(username);
					console.log(username);
					if(result==null){
						console.log(city)
						console.log(road);
						let data = { //namesti nov //TODO dodati i oljine atrribute??
							
								"naziv": $("input[name=name]").val(),
								"brojMesta": $("input[name=SeetsNumber]").val(),
								"cenaKarte": $("input[name=price").val(),
								"datumVreme": $("input[name=date]").val(),
								"krajProslave":$("input[name=EndDate]").val(),
								"tip":$("input[name=type]").val(),
								"vip":$("input[name=VipSeetsNumber]").val(),
								"fan":$("input[name=FanSeetsNumber]").val(),
								"gsirina":gsirina,
								"gduzina":gduzina,
								"pocetakV":$("input[name=appt]").val(),
								"pocetakK":$("input[name=appt1]").val(),
								"user":username,
								"slika":slikaString,
								"road":road,
 								"city":city,
 								"postcode":postcode,
								"nu":numberHause
							};
						
						
						$.ajax({
							type: 'POST',
							url: rootURL,
							contentType: 'application/json',
							dataType : "json",
							data : JSON.stringify(data),
							success : function(result){
								alert("Manifestation has been saved.")
								console.log(result);
								//TODO da ode na stranicu sa svim manifestacijama i da iskoci prozorce
								window.location.href = "http://localhost:8081/PocetniREST/html/SellersManifestation.html";
								},
							error : function(XMLHttpRequest, textStatus, errorThrown){ //TODO: sta ako je lokacija zauzeta?? 
								alert("AJAX ERROR: "+errorThrown);
							}				
						});
					
					}else{					
						var d = $('<div></div>');
						d.append('<p style="font-color:#ff0000;">'+'Manifestation with this name already exists!' + '</p>');
						$("body").append(d);
						
					}}});
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("AJAX ERROR: " + errorThrown);
				}
			
			})
		}}
		else if($("input[name=date]").val() == null || (Date.parse(strDate) < Date.parse($("input[name=date]").val()))
		&& d==null && $("input[name=name]").val() == null
		&& $("input[name=price]").val() == null && $("input[name=SeetsNumber]").val() == null 
		){
			var d = $('<div></div>');
			d.append('<p>'+'Not valid input.' + '</p>');
			$("body").append(d);
		}
	})


	$('#inputFileToLoad').on('change', function() {
		var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcData;

        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        //alert("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
        console.log("Converted Base64 version is " + document.getElementById("imgTest").innerHTML);
		slikaString=document.getElementById("imgTest").innerHTML;
      }
      fileReader.readAsDataURL(fileToLoad);
    }
			  
	});
})


function simpleReverseGeocoding(lon, lat) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
      return response.json();
    }).then(function(json) {
      //document.getElementById('address').innerHTML = json.display_name;
	  road=json.address.road
	  numberHause=json.address.house_number
	  city=json.address.city
	  post=json.address.postcode
      document.getElementById('address').innerHTML = json.address.road +", "+json.address.house_number+", "+json.address.city+", "+json.address.postcode;
     
    })
  }
