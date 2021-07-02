var rootURL1 = "../../PocetniREST/rest/events/getCurrentEvent";
var rootURL2 = "../../PocetniREST/rest/comments/getScore";
var rootURL3 = "../../PocetniREST/rest/comments/getCommentsForEvent";
var rootURL4 ="../../PocetniREST/rest/comments/approve";
var rootURL5 ="../../PocetniREST/rest/comments/delete";
findAll();

var event;

function findAll() {
    $.ajax({
        type : 'GET',
        url : rootURL1,
        dataType : "json",
        success : renderResult
    });
}

function renderResult(data){
	event = data;
	
	var id = event.naziv;
	
	$('#title').append('<h3 class="title" style="font-size: 20px; text-align: center;">'+ event.naziv +'</h3>')
		
	var checkPoster=event.poster.substr(event.poster.length - 4)
	if(checkPoster==".jpg" || checkPoster==".png"){
		$('#poster').append('<img width="225" height="319" class="lazyloaded" data-src="../images/' + event.poster + '" src="../images/' + event.poster + '" alt="' + event.poster + '"itemprop="image">');
	
	}else{
		$('#poster').append('<img width="225" height="319"  src="data:image/png;base64,'+event.poster+'" alt="Red dot" >');
	}
			
	var d = new Date();//TODO check endTime
	if(d > Date.parse(event.datumKraja)){
    	    	
		$.ajax({
			type : 'POST',
			url : rootURL2,
			contentType : 'application/json',
			dataType : "json",
			data :  JSON.stringify({
				"id" : id,
			}),
			success : function(result1){
				$('#score').append('<div class="score-label score-9" style="margin-left: 24px;">' + result1 + '</div>');
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX ERROR: " + errorThrown);
			}
			});
    	 	        	
    }
    else{
    	$('#score').append('<div class="score-label score-9" style="margin-left: 24px;">N/A</div>');		
    }

    if(event.status){
        $('#status').append('<div class="score-label score-9" id="eventStatus">Active</div>');
    }    		
    else{
        $('#status').append('<div class="score-label score-9" id="eventStatus">Inactive</div>');
    }
	
	$('#type').append('<div class="score-label score-9" >'+ event.tipManifestacije +'</div>');
	$('#seats').append('<div class="score-label score-9" >'+ event.brojMesta +'</div>');
	
	$('#startDate').append('<div class="score-label score-9" style="margin-left: 24px;">' + event.datumPocetka+ ' '+ event.vremePocetka + '</div>'); 
	$('#endDate').append('<div class="score-label score-9" >'+ event.datumKraja + ' ' + event.vremeKraja +'</div>');
		
	$('#regularTickets').append('<span class="numbers ranked" ><strong>Regular ticket:</strong></span>');
	$('#regularTickets').append('<span class="numbers popularity" style="margin-left: 2px;"><strong>'+ event.cenaKarte +'</strong>dollars</span>');
	$('#regularTickets').append('<span class="numbers members"><strong>'+ event.preostaloRegular + '</strong>left</span>'); 
		
	$('#fanPit').append('<span class="numbers ranked" ><strong>FAN PIT ticket:</strong></span>');
	$('#fanPit').append('<span class="numbers popularity"><strong>'+ event.cenaKarte*2 + '</strong>dollars</span>');
	$('#fanPit').append('<span class="numbers members"><strong>' + event.preostaloFanpit +'</strong>left</span>'); 	

	$('#vipTickets').append('<span class="numbers ranked" ><strong>VIP ticket:</strong></span>');
	$('#vipTickets').append('<span class="numbers popularity" style="margin-left: 33px;"><strong>'+ event.cenaKarte*4 + '</strong>dollars</span>');
	$('#vipTickets').append('<span class="numbers members"><strong>' + event.preostaloVip +'</strong>left</span>'); 
	
	$('#location').append('<span class="numbers ranked" ><strong>Location:</strong></span>');
	$('#location').append('<span class="numbers popularity"><strong>' + event.lokacija.ulica + " " + event.lokacija.broj +'</strong></span>');
	$('#location').append('<span class="numbers members">' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</span>');
	$('#location').append('<span class="numbers members"><button type="button" class="locationRow" style="" onclick="document.getElementById(\'id04\').style.display=\'block\'" id="'+ event.lokacija.geografskaDuzina + ' ' + event.lokacija.geografskaSirina +'" ><i class="fa fa-globe-americas"></i></button></span>');
	
	//display comments
	$.ajax({
		type : 'POST',
		url : rootURL3,
		contentType : 'application/json',
		dataType : "json",
		data :  JSON.stringify({
			"id" : id,
		}),
		success : function(comments){
			if(comments!=null){
				$('#reviews').append('<div><span class="floatRightHeader"></span><span class="floatRightHeader"><a >Scores</a></span><h2>Comments</h2></div>');
				for(var i = 0; i<comments.length; i++){
                    var com;
                    if(comments[i].obrisan){
                        com = " - REMOVED";
                    }else if(comments[i].odobren && !comments[i].obrisan){
                        com = " - APPROVED";
                    }else if(!comments[i].odobren && !comments[i].obrisan){
						com = ' - <button class="signalApproveBtn" onclick="showConfirmDialog('+comments[i].id+')" id="signalApproveBtn'+comments[i].id+'" >Approve</button>'+
						'- <button class="signalDeleteBtn" onclick="showConfirmDialogD('+comments[i].id+')" id="signalDeleteBtn'+comments[i].id+'" >Delete</button>';
						 }
                    
                    $('#reviews').append('<div class="borderDark" style="padding: 4px 0;"><div class="spaceit"><div class="mb8" style="float: right; text-align: right;">'+                                                    
                                                    comments[i].ocena +'</div></div>'+
                                                    '<div style="float: left;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><a href="#">'+
                                                    comments[i].imeKupca+'</a>'+ com +'</td></tr></tbody></table></div></div>'+
                                                    '<div class="spaceit textReadability word-break pt8 mt8" style="clear: both; border-top: 1px solid #ebebeb;">' +
                                                    comments[i].text + '</div></div>');
					
				}
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
		});
	
	
	
}

var approveId;

function showConfirmDialog(id){
    document.getElementById('id02').style.display = "block";
    approveId = id;
    console.log("dosao1");
}
var deletedId;

function showConfirmDialogD(id){
    document.getElementById('id03').style.display = "block";
    deletedId = id;
    console.log("dosao1");
}


var graphic = null;

$(document).ready(function(){
	
	$('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/salesmanAccount.html";
	})
	
	var modal;
	
	$('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})
	
	$('#approveBtn').click(function(e){
        document.getElementById('id02').style.display = "none";
        console.log("dosao2");
        console.log(approveId); 
		document.getElementById('signalApproveBtn'+approveId).style.display = "none";
		$.ajax({
			type : 'POST',
			url : rootURL4,
			contentType : 'application/json',
			dataType : "json",
			data :  JSON.stringify({
				"id" : approveId,
			}),
			success :window.location.href = "http://localhost:8081/PocetniREST/html/SallesmanEditEvent.html",});
       
    })
	$('#deleteBtn').click(function(e){
        document.getElementById('id03').style.display = "none";
        console.log("dosao2");
        console.log(deletedId); 
		document.getElementById('signalDeleteBtn'+deletedId).style.display = "none";
		$.ajax({
			type : 'POST',
			url : rootURL5,
			contentType : 'application/json',
			dataType : "json",
			data :  JSON.stringify({
				"id" : deletedId,
			}),
			success :window.location.href = "http://localhost:8081/PocetniREST/html/SallesmanEditEvent.html",});
       
    })
	
	window.onclick = function(event) {
		if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	

    //////////////////////////////////////////////MAP//////////////////////////////////////////////////////////////////

	var modal;
	var overlay;
	var closer, lon, lat;

	$("#detailsTable").on('click', '.locationRow', function (){		
		var ret = $(this).attr('id').split(" ");
		lat = ret[1];
		lon = ret[0];

		map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));

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

		var container = document.getElementById('popup');
        closer = document.getElementById('popup-closer');

        overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
		fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
			return response.json();
			}).then(function(json) {
			//document.getElementById('address').innerHTML = json.display_name;
			var tempcontent = document.getElementById('popup-content');
			tempcontent.innerHTML = '<b>' + json.address.road +" "+json.address.house_number+"</b><br />"+json.address.city+" "+json.address.postcode;
			
		})
		overlay.setPosition(ol.proj.fromLonLat([lon, lat]));
        map.addOverlay(overlay);

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
		modal = document.getElementById('id03');
	})

	map.on('singleclick', function (event) {
		var content = document.getElementById('popup-content');
		if (map.hasFeatureAtPixel(event.pixel) === true) {
			var coordinate = event.coordinate;
			fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
			return response.json();
			}).then(function(json) {
			//document.getElementById('address').innerHTML = json.display_name;
			content.innerHTML = '<b>' + json.address.road +" "+json.address.house_number+"</b><br />"+json.address.city+" "+json.address.postcode;
			
			})
			overlay.setPosition(coordinate);
		} else {
			overlay.setPosition(undefined);
			closer.blur();
		}
	});
	
	
})

