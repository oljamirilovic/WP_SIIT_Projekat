
var rootURL2 = "../rest/salesmen/myConsumersAll";


findAll();

function findAll() {
	console.log('find consumers');
	$.ajax({
		type : 'GET',
		url : rootURL2,
		dataType : "json",
		success : renderList
	});
}

function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	$.each(list, function(index, event) {
                console.log(event)
                var tr = null;
                tr = $('<tr></tr>');
                tr.append('<td>' + event.ime + '</td>' +
                            '<td>' + event.prezime+ '</td>' +
                            '<td>' + event.korisnickoIme + '</td>' +
                             '<td>' + event.datumRodjenja+ '</td>'+
                        '<td>' + event.tip.tipKupca+ '</td>' 
                        +'<td>' + event.karte.length + '</td>' );
                        
                    $('#ConsumesTable').append(tr);
        
	});
		
}

$(document).ready(function(){

 var modal;

	$('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/adminAccount.html";
	})
			
	$('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})

	
	window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

$('#admins').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/AllAdminsView.html";
	})	
	$('#customers').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/ViewCustomersByAdmin.html";
	})	
	$('#tickets').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/CartsViewAdmin.html";
	})	
	$('#salesmen').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/ViewSellersByAdmin.html";
	})	


})