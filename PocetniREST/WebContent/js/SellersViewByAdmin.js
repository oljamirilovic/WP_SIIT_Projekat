
var rootURL2 = "../rest/salesmen/getSalesman";


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

$(document).ready(function(){

$('#addSeller').click(function(e){
	window.location.href = "http://localhost:8080/PocetniREST/html/MakeSeller.html";
})	

});

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
                        
                        +'<td>' + event.manifestacije.length + '</td>' );
                        
                    $('#ConsumesTable').append(tr);
        
	});
		
}
