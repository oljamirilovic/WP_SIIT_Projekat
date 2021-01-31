var rootURL1 = "../PocetniREST/rest/events/getEvents";

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

function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	$.each(list, function(index, event) {
		//samo aktivne se prikazuju
		if(event.isStatus()){
	        var tr = $('<tr class="event-list"></tr>');
	        
	        //img
	        tr.append('<td class="title al va-t word-break"><img width="50" height="70" class="lazyloaded" border="0" src="' + event.poster + '" alt="' + event.poster + '">');
	        
	      //TODO href title
	        tr.append('div class="information di-ib mt4"><a style="font-size: 18px" href="' + '">' + event.naziv + '</a>');
	        
	        tr.append('<br>' + event.datumVreme + '<br>' + event.lokacija.toString() + '<br>' + event.cenaKarte +'dollars</div></td>');
	        
	        tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + event.tipManifestacije + '</span></div></td>');
	        
	        tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>');
	        
	        var d = new Date();
			var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
			        
	        if(Date.parse(strDate) > Date.parse(event.datumVreme)){// trenutni datum > zapisanog
	        	tr.append(0 + '</span></div></td>') //TODO izracunati prosecnu ocenu
	        }
	        else{
	        	tr.append('N/A</span></div></td>')
	        }
	        $('#eventTable').append(tr);
		}
	});
		
}

$(document).ready(function(){
	
	$('#loginBtn').click(function(e){
		window.location.href = "http://localhost:8080/PocetniREST/login.html";
	})
	
	$('#signupBtn').click(function(e){
		window.location.href = "http://localhost:8080/PocetniREST/signup.html";
	})
})
