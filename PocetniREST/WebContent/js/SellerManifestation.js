var rootURL1 = "../rest/events/getEvents";

var rootURL5 = "../rest/comments/getScore";

var rootURL7 = "../rest/events/searchEvent";
var rootURL8 = "../rest/events/setCurrentEvent";





findAll();

function findAll() {
	console.log('findAll');
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
						window.location.href = "http://localhost:8081/PocetniREST/html/unregEvent.html";
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
	
	removeTableContent();
		
	$.each(list, function(index, event) {
		//samo aktivne se prikazuju
		if(event.status){
	        var tr = $('<tr class="event-list"></tr>');
	        var d = new Date();
	        
	        tr.append('<td class="ac"><img width="100" height="120" class="lazyloaded" border="0" src="images/' + event.poster + '" alt="' + event.poster + '"></td>');
	        
	        tr.append('<td class="title ac va-c word-break"><a style="font-size: 18px" onclick= "showEvent(\''+event.naziv+'\')"  href=\"#\">' + event.naziv + '</a><br>Date: ' + event.datumPocetka + ' ' + event.vremePocetka + '<br>Ticket price: ' + event.cenaKarte +' dollars</td>');
	        	        
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
			        	tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>' + result1 + '</span></div></td>') 

					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert("AJAX ERROR: " + errorThrown);
					}
					});
	        	 	        	
	        }
	        else{
	        	tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>N/A</span></div></td>')
	        }
	        $('#eventTable').append(tr);
		}
	});
		
}

function removeTableContent(){
	var paras = document.getElementsByClassName("event-list");
	
		while(paras[0]) {
		    paras[0].parentNode.removeChild(paras[0]);
		}
	}