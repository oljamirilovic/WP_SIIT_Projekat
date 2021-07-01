var rootURL1 = "../rest/events/getEvents";
var rootURL5 = "../rest/comments/getScore";
var rootURL7 = "../rest/events/searchEvent";
var rootURL8 = "../rest/events/setCurrentEvent";
var rootURL9 = "../rest/events/getEventTypes";

var beforeFilter = [];
var afterEventTypeFilter = [];
var withAvailableTickets = false;
var graphic = null;

findAll();

function findAll() {
	$.ajax({
		type : 'GET',
		url : rootURL1,
		dataType : "json",
		success : renderList
	});
}

function showEvent(id){
	
	$.ajax({
		type : 'POST',
		url : rootURL7,
		contentType : 'application/json',
		dataType : "json",
		data :  JSON.stringify({
			"id" : id,
		}),
		success : function(result){
			if(result!=null){
				
				$.ajax({
					type : 'POST',
					url : rootURL8,
					contentType : 'application/json',
					dataType : "json",
					data :  JSON.stringify(result),
					success :function(){
						//TODO event window
						window.location.href = "http://localhost:8081/PocetniREST/html/salesmanEvent.html";
					},
					error : function(XMLHttpRequest, textStatus, errorThrown){
						alert("AJAX ERROR: "+errorThrown);
					}
				});
				
			}
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
		});
}

function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);

    $.ajax({
		type : 'GET',
		url : rootURL9, //getEventTypes
		dataType : "json",
		success :function(result){
			var eventTypes = result == null ? [] : (result instanceof Array ? result : [ result ]);
			$('<option>').val(0).text("All types").appendTo('#eventTypes');

			$.each(eventTypes, function(index, t){
				$('<option>').val(index+1).text(t).appendTo('#eventTypes');
			})
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert("AJAX ERROR: "+errorThrown);
		}
	});
	
	removeTableContent();
	
	$.each(list, function(index, event) {
		//prikazuju se i aktivne i neaktivne
        if(event.status){
            var tr = $('<tr class="event-list"></tr>');
            var d = new Date();
            
            tr.append('<td class="ac"><img width="100" height="120" class="lazyloaded" border="0" src="../images/' + event.poster + '" alt="' + event.poster + '"></td>');
            
            tr.append('<td class="title ac va-c word-break"><a style="font-size: 18px" onclick= "showEvent(\''+event.naziv+'\')"  href=\"#\">' + event.naziv + '</a></td>');
            
            tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + event.datumPocetka + ' ' + event.vremePocetka + '</a></td>');

            tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + event.cenaKarte + '</a></td>');

            tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + event.lokacija.ulica + " " + event.lokacija.broj + '</a><br>' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</td>');
            
            tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + event.tipManifestacije + '</span></div></td>');
            
            //TODO check endTime
            if(d > Date.parse(event.datumKraja)){
                var id = event.naziv;
                
                $.ajax({
                    type : 'POST',
                    url : rootURL5,
                    contentType : 'application/json',
                    dataType : "json",
                    data :  JSON.stringify({
                        "id" : id,
                    }),
                    success : function(result1){
                        var added = false;
                        if(!added){
                            tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>' + result1 + '</span></div></td>') 
                            added = true;
                        }
                        if(added){
                            var preostalo = parseInt(event.preostaloRegular) + parseInt(event.preostaloVip) + parseInt(event.preostaloFanpit);

                            tr.append('<td class="score ac fs14" style="display:none;"><div><span class="text score-label score-na" ></span>' + preostalo + '</span></div></td>');
                            
                            tr.append('<td class="score ac fs14" style="display:none;"><div><span class="text score-label score-na" ></span>' + event.lokacija.ulica + ", " + event.lokacija.broj + ", " + event.lokacija.mesto + ", " + event.lokacija.postanskiBroj + '</span></div></td>');
                        }
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown) {
                        alert("AJAX ERROR: " + errorThrown);
                    }
                    });
                                
            }
            else{
                var added = false;
                if(!added){
                    tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>N/A</span></div></td>')
                    added = true;
                }
                if(added){
                    var preostalo = parseInt(event.preostaloRegular) + parseInt(event.preostaloVip) + parseInt(event.preostaloFanpit);

                    tr.append('<td class="score ac fs14" style="display:none;"><div><span class="text score-label score-na" ></span>' + preostalo + '</span></div></td>');
                    
                    tr.append('<td class="score ac fs14" style="display:none;"><div><span class="text score-label score-na" ></span>' + event.lokacija.ulica + ", " + event.lokacija.broj + ", " + event.lokacija.mesto + ", " + event.lokacija.postanskiBroj + '</span></div></td>');
                }
            }

            
            $('#eventTable').append(tr);
        }
	});

    $('div.content select.right option[value="3"]').attr("selected",true);
	var sel = document.getElementById("mySelect");
	sortBy(sel.selectedIndex);

	var temp = document.getElementById("eventTable").getElementsByTagName("tr");
	for (i = 1; i < temp.length; i++) {
			beforeFilter[i] = temp[i].style.display;	
			afterEventTypeFilter[i] = temp[i].style.display;		
	}
		
}

$(document).ready(function(){
	
    var modal;

	$('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/salesmanAccount.html";
	})
			
	$('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})

    $('#locationBtn').click(function(e){
		modal = document.getElementById('id03');
	})
	
	window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /////////////////////////////////////////////////////MAP////////////////////////////////////////////////////////////////////////////////
	
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

      ///////////////////////////////////////////////////////SEARCH//////////////////////////////////////////////////////////////////////////////
	
	  var added = false;

	  $('#searchBtn').click(function(e){
		  var title = $('input[name=title]').val().toLowerCase();
		  var fromDate = $('input[name="fromdate"]').val().toLowerCase();
		  var toDate = $('input[name=todate]').val().toLowerCase();
		  var minPrice = Number($('input[name=minPrice]').val().toLowerCase());
		  var maxPrice = Number($('input[name=maxPrice]').val().toLowerCase());
  
		  var table, tr, td, i, txtValue;
		  table = document.getElementById("eventTable");
		  tr = table.getElementsByTagName("tr");
  
		  if(title!="" || fromDate!="" || toDate!="" || minPrice!=0 || maxPrice!=0 || gsirina!=0 || gduzina!=0 ){
			  added = false;
			  for (i = 1; i < tr.length; i++) {
				  tr[i].style.display = "none";
			  }		
  
			  if(title!="") {
				  var addedNow = false;
				  for (i = 1; i < tr.length; i++) {
					  td = tr[i].getElementsByTagName("td")[1];
					  if (td) {
						  txtValue = td.innerText;
						  if (txtValue.toLowerCase().indexOf(title) > -1) {
							  tr[i].style.display = "";
							  addedNow = true;
						  } 
					  }
				  }
				  added = addedNow;
			  }
			  if(fromDate != "" ){
				  var addedNow = false;
				  for (i = 1; i < tr.length; i++) {
					  td = tr[i].getElementsByTagName("td")[2];
					  if (td) {
						  txtValue = td.innerText;						 
						  if(tr[i].style.display == "" && Date.parse(txtValue) < Date.parse(fromDate)){
							  tr[i].style.display = "none";
						  }
						  else if(title=="" && !added && Date.parse(txtValue) >= Date.parse(fromDate)){
							  tr[i].style.display = "";		
							  addedNow = true;
						  }
					  }
				  }
				  added = addedNow;
			  }
			  if(toDate != "" ){
				  var addedNow = false;
				  for (i = 1; i < tr.length; i++) {
					  td = tr[i].getElementsByTagName("td")[2];
					  if (td) {
						  txtValue = td.innerText;
						  if(tr[i].style.display == "" && Date.parse(txtValue) > Date.parse(toDate)){
							  tr[i].style.display = "none";
						  }
						  else if (title=="" && fromDate == "" && !added && Date.parse(txtValue) <= Date.parse(toDate)) {
							  tr[i].style.display = "";	
							  addedNow = true;
						  } 
					  }
				  }
				  added = addedNow;
			  }
			  if(minPrice != 0 ){
				  var addedNow = false;
				  for (i = 1; i < tr.length; i++) {
					  td = tr[i].getElementsByTagName("td")[3];
					  if (td) {
						  txtValue = Number(td.innerText.toLowerCase()) ;
						  if(tr[i].style.display == "" && txtValue < minPrice){
							  tr[i].style.display = "none";
						  }
						  else if ((title=="" && fromDate=="" && toDate=="" && !added) && txtValue >= minPrice) {
							  tr[i].style.display = "";	
							  addedNow = true;
						  } 
					  }
				  }
				  added = addedNow;
			  }
			  if(maxPrice != 0 ){
				  var addedNow = false;
				  for (i = 1; i < tr.length; i++) {
					  td = tr[i].getElementsByTagName("td")[3];
					  if (td) {
						  txtValue = Number(td.innerText.toLowerCase()) ;
						  if(tr[i].style.display == "" && txtValue > maxPrice){
							  tr[i].style.display = "none";
						  }
						  else if (((title=="" && fromDate=="" && toDate=="" && minPrice==0) && !added) && txtValue <= maxPrice) {
							  tr[i].style.display = "";	
							  addedNow = true;
						  } 
					  }
				  }
				  added = addedNow;
			  }
			  if(gsirina!=0 && gduzina!=0){
				  var addedNow = false;
				  for (i = 1; i < tr.length; i++) {
					  td = tr[i].getElementsByTagName("td")[8];
					  if (td) {
						  txtValue = td.innerText;
						  var adr = document.getElementById('address').innerHTML;
						  if(tr[i].style.display == "" && txtValue.toLowerCase().indexOf(adr.toLowerCase()) <= -1){
							  tr[i].style.display = "none";
						  }
						  else if (((title=="" && fromDate=="" && toDate=="" && minPrice==0 && maxPrice==0) && !added) && txtValue.toLowerCase().indexOf(adr.toLowerCase()) > -1) {
							  tr[i].style.display = "";	
							  addedNow = true;
						  } 
					  }
				  }
				  added = addedNow;
			  }
		  }
		  else if(title=="" && fromDate=="" && toDate=="" && minPrice==0 && maxPrice==0 && gsirina==0 && gduzina==0 ){
			  added = false;
			  for (i = 1; i < tr.length; i++) {
				  tr[i].style.display = "";	
			  }
		  }
		  var temp = document.getElementById("eventTable").getElementsByTagName("tr");
		  for (i = 1; i < temp.length; i++) {
				  beforeFilter[i] = temp[i].style.display;
				  afterEventTypeFilter[i] = temp[i].style.display;
		  }
  
		  filterEventTypes();
		  filterTicketsLeft();
		  var sel = document.getElementById("mySelect");
		  sortBy(sel.selectedIndex);
		  
	  });
	
	
	////////////////////////////////////////////////SORT////////////////////////////////////////
	$('#mySelect').on('change', function() {
		var e = document.getElementById("mySelect");
		sortBy(e.selectedIndex);		  
	});

	///////////////////////////////////////FILTER EVENT TYPES////////////////////////////////////////////////////////
	$('#eventTypes').on('change', function() {
		filterEventTypes();
	});

	////////////////////////////////////FILTER ONLY TICKETS LEFT///////////////////////////////////////////////////////////
	$('#availableTickets').click(function() {
		filterTicketsLeft();
	});
	
})

function removeTableContent(){
	var paras = document.getElementsByClassName("event-list");
	
		while(paras[0]) {
		    paras[0].parentNode.removeChild(paras[0]);
		}
}

function simpleReverseGeocoding(lon, lat) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
        return response.json();
    }).then(function(json) {
        //document.getElementById('address').innerHTML = json.display_name;
        document.getElementById('address').innerHTML = json.address.road +", "+json.address.house_number+", "+json.address.city+", "+json.address.postcode;
        
    })
}

function sortBy(index){
	/*var e = document.getElementById("mySelect");*/
	var indexSelected = index;
	var table, rows, switching, i, x, y, tr, shouldSwitch, dir, n = 0;
	if(indexSelected%2 == 0){
		dir = "asc";
	}	
	else{
		dir = "desc";
	}	
	if(indexSelected == 0 || indexSelected == 1){//name
		n = 1;
	}else if(indexSelected == 2 || indexSelected == 3){//date
		n = 2;
	}else if(indexSelected == 4 || indexSelected == 5){//price
		n = 3;
	}else if(indexSelected == 6 || indexSelected == 7){//location
		n = 4;
	}

	table = document.getElementById("eventTable");
	tr = table.getElementsByTagName("tr");
	var backup = [{}];
	var backupAfter = [];
	var backupBefore = [];
	for(var i = 1; i < (tr.length-1); i++){
		var h = tr[i].getElementsByTagName("TD")[1].innerText.toLowerCase();
		backup[i] = {name : h, disp: tr[i].style.display};
		if(afterEventTypeFilter.length > 0){
			backupAfter[i] = (afterEventTypeFilter[i] == "") ? "" : "none";
			backupBefore[i] = (beforeFilter[i] == "") ? "" : "none";
		}
	}
		
	switching = true;
	while (switching) {
		switching = false;
		//rows = table.rows;
		rows = table.getElementsByTagName("tr");
		for (i = 1; i < (rows.length-1); i++) {
		shouldSwitch = false;		
		x = rows[i].getElementsByTagName("TD")[n];
		y = rows[i + 1].getElementsByTagName("TD")[n];
		var xval = (n==3) ? Number(x.innerText.toLowerCase()) : x.innerText.toLowerCase();
		var yval = (n==3) ? Number(y.innerText.toLowerCase()) : y.innerText.toLowerCase();
		if (dir == "asc") {				
			if (xval > yval) {
				shouldSwitch = true;
				break;
			}				
		} else if (dir == "desc") {
			if (xval < yval) {
			shouldSwitch = true;
			break;
			}
		}
		}
		if (shouldSwitch) {
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		} 
	}
	for(var i = 1; i < (tr.length); i++){
		for (var j = 1; j < backup.length; j++) {
			if (backup[j].name == tr[i].getElementsByTagName("td")[1].innerText.toLowerCase()) {
				tr[i].style.display = backup[j].disp;
				if(afterEventTypeFilter.length > 0){
					afterEventTypeFilter[i] = backupAfter[j];
					beforeFilter[i] = backupBefore[j];
				}
				break;
			}
		}
	}

}


function filterEventTypes(){
	var e = document.getElementById("eventTypes");
	var input, filter, table, tr, td, i, txtValue;
	if(e.options.length > 0){
		input = e.options[e.selectedIndex].text;
		filter = input.toUpperCase();
		table = document.getElementById("eventTable");
		tr = table.getElementsByTagName("tr");

		if(input == "All types"){
			if(beforeFilter.length > 0){
				for (i = 1; i < beforeFilter.length; i++) {
					if(  beforeFilter[i] == "" ){
						afterEventTypeFilter[i] = "";
						tr[i].style.display = "";
					}else if(beforeFilter[i] == "none"){
						tr[i].style.display = "none";	
						afterEventTypeFilter[i] = "none";
					}
				}
			}
			else{
				for (i = 1; i < tr.length; i++) {
					afterEventTypeFilter[i] = "";
					tr[i].style.display = "";							
				}
			}			
		}

		// Loop through all table rows, and hide those who don't match the search query
		else{
			if(beforeFilter.length > 0){
				for (i = 1; i < (beforeFilter.length); i++) {
					td = tr[i].getElementsByTagName("td")[5];
					if (td) {
						txtValue = td.innerText;
						if (beforeFilter[i] == "" && txtValue.toUpperCase().indexOf(filter) > -1) {
							afterEventTypeFilter[i] = "";
							tr[i].style.display = "";
							
						} else {
							tr[i].style.display = "none";
							afterEventTypeFilter[i] = "none";
						}
					}
				}
			}else{
				for (i = 1; i < (tr.length); i++) {
					td = tr[i].getElementsByTagName("td")[5];
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toUpperCase().indexOf(filter) > -1) {
							afterEventTypeFilter[i] = "";
							tr[i].style.display = "";
							
						} else {
							tr[i].style.display = "none";
							afterEventTypeFilter[i] = "none";
						}
					}
				}
			}
			
		}
	}
	filterTicketsLeft();
}

function filterTicketsLeft(){
	var table, tr, td, i, txtValue;
	table = document.getElementById("eventTable");
	tr = table.getElementsByTagName("tr");
	if($('#availableTickets').prop('checked')) {
		withAvailableTickets = true;
		if(afterEventTypeFilter.length > 0){
			for (i = 1; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[7];
				if (td) {
					txtValue = Number(td.innerText);
					if (afterEventTypeFilter[i] == "" && txtValue >= 1) {
						tr[i].style.display = "";
					} else if(afterEventTypeFilter[i] == "" && txtValue < 1){
						tr[i].style.display = "none";
					}
				}
			}
		}
		
	} else {
		withAvailableTickets = false;
		if(afterEventTypeFilter.length > 0){
			for (i = 1; i < afterEventTypeFilter.length; i++) {
				if(  afterEventTypeFilter[i] == ""){
					tr[i].style.display = "";
				}else if(afterEventTypeFilter[i] == "none"){
					tr[i].style.display = "none";
				}
			}
		}else{
			for (i = 1; i < tr.length; i++) {
					tr[i].style.display = "";
				
			}
		}
	}
}