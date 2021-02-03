var rootURL1 = "../../PocetniREST/rest/events/getCurrentEvent";
var rootURL2 = "../../PocetniREST/rest/comments/getScore";

findAll();

function findAll() {
    console.log('findAll');
    $.ajax({
        type : 'GET',
        url : rootURL1,
        dataType : "json",
        success : renderResult
    });
}

function renderResult(data){
	var event = data;
	
	$('#title').append('<h3 class="title" style="font-size: 20px; text-align: center;">'+ event.naziv +'</h3>')
		
	$('#poster').append('<img width="225" height="319" class="lazyloaded" data-src="../images/' + event.poster + '" src="../images/' + event.poster + '" alt="' + event.poster + '"itemprop="image">');
		
	var d = new Date();//TODO check endTime
	if(d > Date.parse(event.datumKraja)){
    	var id = event.naziv;
    	
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
				$('#status').append('<div class="score-label score-9">Inactive</div>');
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX ERROR: " + errorThrown);
			}
			});
    	 	        	
    }
    else{
    	$('#score').append('<div class="score-label score-9" style="margin-left: 24px;">N/A</div>');
    	$('#status').append('<div class="score-label score-9">Active</div>');
    }
	
	$('#type').append('<div class="score-label score-9" >'+ event.tipManifestacije +'</div>');
	$('#seats').append('<div class="score-label score-9" >'+ event.brojMesta +'</div>');
	
	$('#startDate').append('<div class="score-label score-9" style="margin-left: 24px;">' + event.datumPocetka+ ' '+ event.vremePocetka + '</div>'); 
	$('#endDate').append('<div class="score-label score-9" >'+ event.datumKraja + ' ' + event.vremeKraja +'</div>');
		
	$('#regularTickets').append('<span class="numbers ranked" ><strong>Regular:</strong></span>');
	$('#regularTickets').append('<span class="numbers popularity" style="margin-left: 2px;"><strong>'+ event.cenaKarte +'</strong>dollars</span>');
	$('#regularTickets').append('<span class="numbers members"><strong>'+ event.preostaloRegular + '</strong>left</span>'); 
	
	$('#vipTickets').append('<span class="numbers ranked" ><strong>VIP:</strong></span>');
	$('#vipTickets').append('<span class="numbers popularity" style="margin-left: 33px;"><strong>'+ event.cenaKarte*2 + '</strong>dollars</span>');
	$('#vipTickets').append('<span class="numbers members"><strong>' + event.preostaloVip +'</strong>left</span>'); 
	
	$('#fanPit').append('<span class="numbers ranked" ><strong>FAN PIT:</strong></span>');
	$('#fanPit').append('<span class="numbers popularity"><strong>'+ event.cenaKarte*4 + '</strong>dollars</span>');
	$('#fanPit').append('<span class="numbers members"><strong>' + event.preostaloFanpit +'</strong>left</span>'); 
	
	$('#location').append('<span class="numbers ranked" ><strong>Location:</strong></span>');
	$('#location').append('<span class="numbers popularity"><strong>' + event.lokacija.ulica + " " + event.lokacija.broj +'</strong></span>');
	$('#location').append('<span class="numbers members">' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</span>');
	
	
	
}


