var rootURL1 = "../../PocetniREST/rest/customers/getCurrentCustomer";
var rootURL2 = "../../PocetniREST/rest/tickets/searchOwner";
var rootURL3 = "../../PocetniREST/rest/events/searchEvent";
var rootURL4 = "../../PocetniREST/rest/events/setCurrentEvent";
var rootURL5 = "../../PocetniREST/rest/tickets/cancelReservedTicket";

findAll();

function findAll() {
	$.ajax({
        type : 'GET',
        url : rootURL1,
        dataType : "json",
        success : function(result){                            
            $.ajax({
                type : 'POST',
                url : rootURL2,
                contentType : 'application/json',
                dataType : "json",
                data :  JSON.stringify({ "id" : result.korisnickoIme,}),
                success : renderResult
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            alert("AJAX ERROR: "+errorThrown);
        }
    });
}

function renderResult(data){
    var list = data == null ? [] : (data instanceof Array ? data : [ data ]);

    $.each(list, function(index, ticket) {
        var tr = $('<tr class="event-list"></tr>');
        var date = new Date();

        if(!ticket.izbrisana){
            var status = ticket.status ? "RESERVED" : "CANCELLED";

            tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + ticket.id + '</a></td>');
                    
            tr.append('<td class="title ac va-c word-break"><a style="font-size: 18px" onclick= "showEvent(\''+ticket.nazivmanifestacije+'\')"  href=\"#\">' + ticket.nazivmanifestacije + '</a></td>');
                        
            tr.append('<td class="title ac va-c word-break">' + ticket.datum + '</td>');

            tr.append('<td class="title ac va-c word-break">' + ticket.cena +' </td>');
            
            tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + ticket.tipKarte + '</span></div></td>');

            tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + status + '</span></div></td>');
            
            date.setDate(date.getDate() + 7);
            if(ticket.status && (Date.parse(ticket.datum) >= date))
                tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ><button class="deleteTableRowBtn" onclick="document.getElementById(\'id02\').style.display=\'block\'" id="'+ ticket.id +'" ><i class="far fa-window-close"></i></button></span></div></td>');
            
            $('#ticketsTable').append(tr);
        }

    })

}

function showEvent(id){
	
	$.ajax({
		type : 'POST',
		url : rootURL3,
		contentType : 'application/json',
		dataType : "json",
		data :  JSON.stringify({
			"id" : id,
		}),
		success : function(result){
			if(result!=null){
				
				$.ajax({
					type : 'POST',
					url : rootURL4,
					contentType : 'application/json',
					dataType : "json",
					data :  JSON.stringify(result),
					success :function(){
						window.location.href = "http://localhost:8081/PocetniREST/html/customerEvent.html";
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
var id;

$(document).ready(function(){

    ///////////////LOGOUT/////////////////////////////

    $('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/customerAccount.html";
	})
	
	var modal;
	
	$("#ticketsTable").on('click', '.deleteTableRowBtn', function (){
        id = $(this).attr('id');
		modal = document.getElementById('id02');
	})

    $('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})

    window.onclick = function(event) {
		if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /////////////////////CANCEL RESERVATION//////////////////////////////////////

    $('#cancelReservationBtn').click(function(e){
		$.ajax({
			type: 'POST',
			url: rootURL5, 
			contentType: 'application/json',
			dataType : "json",
			data : JSON.stringify({
				"id" : id,
			}),
			success : function(){
                window.location.href = "http://localhost:8081/PocetniREST/html/customerTickets.html";
            },
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert("AJAX ERROR: "+errorThrown);
			}				
		});
	})
})