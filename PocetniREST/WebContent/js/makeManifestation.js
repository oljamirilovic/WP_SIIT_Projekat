var rootURL = "../rest/events/add";
//var rootURL2 = "../PocetniREST/rest/users/getUsers";
var rootURL4 = "../rest/events/exists";
var rootURL1 = "../rest/salesmen/getCurrentSalesmen";
//TODO datumi,zatim ono da iskoci kada se doda, i popraviti dugmice

var graphic=null;
var slikaString='';
var road="";
var city="";
var postcode="";
var numberHause="";
	
var dateLimitSet = false;

function setDateLimit(){
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("startDate").setAttribute("min", today);
    document.getElementById("EndDate").setAttribute("min", today); 
    
    
}

$(document).ready(function(){
	
	if(!dateLimitSet){
		setDateLimit();
	}
	
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/salesmanAccount.html";
	})
	
	$('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
	
	var modal;
	
	$('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})
	
	 window.onclick = function(event) {
		if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	
		var gsirina = -10000;
		var gduzina = -10000;
		
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
		if($("input[name=startDate]").val() != null &&  slikaString!="" && gsirina!=-10000 && gduzina!=-10000  && $("input[name=EndDate]").val() != null && $("input[name=VipSeetsNumber]").val() != ""
				&& d!=null && $("input[name=name]").val() != null && $("input[name=FanSeetsNumber]").val() != ""
				&& $("input[name=price]").val() != "" && $("input[name=SeetsNumber]").val() != "" ){
					if( (Date.parse(strDate) < Date.parse($("input[name=startDate]").val())) && Date.parse($("input[name=startDate]").val())<= Date.parse($("input[name=EndDate]").val()) ){
			
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
						var sel = document.getElementById('tip');
							var opt = sel.options[sel.selectedIndex];
							var vrednost=opt.value;		
						let data = { //namesti nov //TODO dodati i oljine atrribute??
							
								"naziv": $("input[name=name]").val(),
								"brojMesta": $("input[name=SeetsNumber]").val(),
								"cenaKarte": $("input[name=price").val(),
								"datumVreme": $("input[name=startDate]").val(),
								"krajProslave":$("input[name=EndDate]").val(),
								"tip":vrednost,
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
								if(result !=null){
									alert("Manifestation has been saved.")
									console.log(result);
									//TODO da ode na stranicu sa svim manifestacijama i da iskoci prozorce
									window.location.href = "http://localhost:8081/PocetniREST/html/SellersManifestation.html";
								}else{
									invalidInput("Location is already reserved at that time!","anime-detail-header-stats di-tc va-t");
								}
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
		}else {
			invalidInput("Invalid date!","anime-detail-header-stats di-tc va-t");	
		}}
		else {
			invalidInput("All fields must be filled!","anime-detail-header-stats di-tc va-t");
			if(slikaString==''){
					invalidInput("Please input poster!","anime-detail-header-stats di-tc va-t");
				}
		if(gsirina==-10000 && gduzina==-10000){
			invalidInput("Please input location!","anime-detail-header-stats di-tc va-t");
		}
				
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
		newImage.height=319;
		newImage.width=225;
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


function invalidInput(mesg,cont){
	var reds = document.getElementsByClassName("red");
	
	if(reds.length != 0){
		for(var k = 0; k < reds.length; k++){
			reds[k].parentNode.removeChild(reds[k]);
		}								 
	}
        
	var elements = document.getElementsByClassName(cont);
	var div = document.createElement('div');
	div.className = 'red';
	div.textContent = mesg;
	div.id = "error";
	elements[0].append(div);
}