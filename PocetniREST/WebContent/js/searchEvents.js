var rootURL1 = "../PocetniREST/rest/events/findEventsWithTitle";


function simpleReverseGeocoding(lon, lat) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
      return response.json();
    }).then(function(json) {
      //document.getElementById('address').innerHTML = json.display_name;
      document.getElementById('address').innerHTML = json.address.road +", "+json.address.house_number+", "+json.address.city+", "+json.address.postcode;
     
    })
  }

	
	map.on('click', function (evt) { 
		var lonlat  = ol.proj.toLonLat(evt.coordinate).map(function(val) {
          return val.toFixed(6);
        });
		gsirina = lonlat[1];//lat
		gduzina = lonlat[0];//lon
		var lon = document.getElementById('lon').value = coordinate[0];
        var lat = document.getElementById('lat').value = coordinate[1];
		
	})
	
	document.getElementById('reversegeocoding').addEventListener('click', function(e) {
        if (document.getElementById('lon').value && document.getElementById('lat').value) {
          simpleReverseGeocoding(document.getElementById('lon').value, document.getElementById('lat').value);
        }
      });
	
	$('#searchBtn').click(function(e){
		var title = $('input[name=title]').val();
		var fromDate = $('input[name="fromdate"]').val();
		var toDate = $('input[name=todate]').val();
		var minPrice = $('input[name=minPrice]').val();
		var maxPrice = $('input[name=maxPrice]').val();
		
		if(title!=""){
			
			$.ajax({
				type : 'POST',
				url : rootURL1,
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : title,
				}),
				success : function(result){
					if(result!=null){
						
					}
					
				},
				error : function(XMLHttpRequest, textStatus, errorThrown){
					alert("AJAX ERROR: "+errorThrown);
				}
			});
			
		}
		
	})
	
