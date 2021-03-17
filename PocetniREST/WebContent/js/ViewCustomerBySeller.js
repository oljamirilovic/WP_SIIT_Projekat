
var rootURL2 = "../PocetniREST/rest/seller/myConsumers";


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
                var tr = null;
                tr = $('<tr></tr>');
                tr.append('<td>' + event.getIme() + '</td>' +
                            '<td>' + event.getPrezime()+ '</td>' +
                            '<td>' + event.getKorisnickoIme() + '</td>' +
                            '<td>' + event.getKarte().length() + '</td>' +
                    '<td>' + event.getTip.getTipKupca()+ '</td>' );
                    if(event.status()==true){
                    tr.append('<td>reserved</td>');
                }
                    else{
                        tr.append('<td>quit</td>')
                    }
                    $('#ConsumesTable').append(tr);
        
	});
		
}
