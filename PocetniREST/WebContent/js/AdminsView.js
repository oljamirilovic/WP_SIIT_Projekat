
var rootURL2 = "../rest/admins/getAdmins";


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
                            '<td>' + event.korisnickoIme + '</td>'
                              );
                        
                    $('#ConsumesTable').append(tr);
        
	});
		
}
