var rootURL = "../rest/events/change";
var rootURL3 = "../../PocetniREST/rest/events/getCurrentEvent";
var rootURL1 = "../rest/salesmen/getCurrentSalesmen";
var rootURL2 = "../rest/salesmen/cahngeEvent";

findAll();

var event;

function findAll() {
    $.ajax({
        type : 'GET',
        url : rootURL3,
        dataType : "json",
        success : renderResult
    });
}

function renderResult(data){
	event = data;
	
	
	$('#title').append('<h3 class="title" style="font-size: 20px; text-align: center;">'+ data.naziv +'</h3>')
	}

var graphic=null;
var slikaString='';
var road=""
var city=""
var postcode=""
var numberHause=""


$(document).ready(function(){
	
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
		
		
		
					
					$.ajax({
						type : 'GET',
						url : rootURL1,
						dataType : "json",
						success : function(result1){username=result1.korisnickoIme;		
							var sel = document.getElementById('tip');
							var opt = sel.options[sel.selectedIndex];
							var vrednost=opt.value;			
						let data = {	
								//""	
								"tip":vrednost,								
								"gsirina":gsirina,
								"gduzina":gduzina,
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
								
								if(!result){
									alert("Already exits manifestation at that location at that time");
								}
								console.log(result);
								//TODO da ode na stranicu sa svim manifestacijama i da iskoci prozorce
								window.location.href = "http://localhost:8081/PocetniREST/html/SellersManifestation.html";
								
								},
							error : function(XMLHttpRequest, textStatus, errorThrown){ //TODO: sta ako je lokacija zauzeta?? 
								alert("AJAX ERROR: "+errorThrown);
							}				
						});
					
					}
			
			})
		
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
        newImage.height = 319;
        newImage.width = 225;
        
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
