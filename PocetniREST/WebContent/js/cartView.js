
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
