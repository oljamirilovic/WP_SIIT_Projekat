
var rootURL2 = "../rest/tickets/getTickets";


findAll();

function findAll() {
	console.log('carts ');
	$.ajax({
		type : 'GET',
		url : rootURL2,
		dataType : "json",
		success : renderList
	});
}

function renderList(data){ console.log(data)
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	$.each(list, function(index, event) {
                var tr = null;
                console.log(event)
                tr = $('<tr></tr>');
                tr.append('<td>' + event.nazivmanifestacije + '</td>' +
                            '<td>' + event.cena+ '</td>' +
                            '<td>' + event.datum + '</td>' +
                            '<td>' + event.tipKarte + '</td>' +
                        '<td>' + event.korisnickoIme+ '</td>'+
                        '<td>' + event.id + '</td>' 
                        
                     );
                    if(event.status==true){
                    tr.append('<td>reserved</td>');
                }
                    else{
                        tr.append('<td>quit</td>')
                    }
                    $('#allTickets').append(tr);
        
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
