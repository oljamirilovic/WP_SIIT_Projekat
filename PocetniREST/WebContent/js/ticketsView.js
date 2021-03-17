
var rootURL = "../PocetniREST/rest/tickets/";
//TODO dugmici,
findAll();

function findAll() {
	console.log('findAll');
	$.ajax({
		type : 'GET',
		url : rootURL,
		dataType : "json",
		success : renderList
	});
}


function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var forma = $("#allTickets"); //mislim da ovde dode od tabele id allTickets
	
	$.each(list, function(index, event) {
        var tr = null;
        tr = $('<tr></tr>');
        tr.append('<td>' + event.getNazivmanifestacije() + '</td>' +
            '<td>' + event.getCena()+ '</td>' +
            '<td>' + event.getDatum() + '</td>' +
            '<td>' + event.getKorisnickoIme() + '</td>' +
            '<td>' + event.getId() + '</td>' );
            if(event.getStatus()==true){
            tr.append('<td>reserved</td>');
        }
            else{
                tr.append('<td>quit</td>')
            }
    $('#allTickets').append(tr);
	});
		
}



$(document).on('submit', '.search', function(e){
    e.preventDefault();
    var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    var d1 = $(this).find("input[name=fromDate]").val();
    var d2 = $(this).find("input[name=toDate]").val();
    var p1 = $(this).find("input[name=minPrice]").val();
    var p2 = $(this).find("input[name=maxPrice]").val();
    var name = $(this).find("input[name=name]").val();
    if(name != null || (Date.parse(strDate) > Date.parse(d1)) || (Date.parse(strDate) > Date.parse(d2))
				|| p1!=null || p2 != null){

                
	$.ajax({
		type : 'GET',
		url : rootURL,
		dataType : "json",
		success : function(result){
			//popuni tablu
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
            $("#allTickets").find("tr:gt(0)").remove();
	        $.each(list, function(index, event) {
                let tf=true;
                if(name!=null){
                    if(event.getManifestacija().getNaziv()!=name){
                        tf=false;
                    }
                }
                if(d1!=null  && tf){
                    if(Date.parse(event.getDatumVreme())<Date.parse(d1)){
                        tf=false;
                    }
                }
                if(d1!=null  && tf){
                    if(Date.parse(event.getDatumVreme())>Date.parse(d2)){
                        tf=false;
                    }
                }
                if(p1!=null  && tf){
                    if(event.cenaKarte()<p1){
                        tf=false;
                    }       
                }
                if(p2!=null  && tf){
                    if(Date.parse(event.getDatumVreme())>Date.parse(d1)){
                        tf=false;
                    }
                }
                if(tf){

                    var tr = null;
                    tr = $('<tr></tr>');
                    tr.append('<td>' + event.getNazivmanifestacije + '</td>' +
		                '<td>' + event.getCena()+ '</td>' +
		                '<td>' + event.getDatum() + '</td>' +
		                '<td>' + event.getKorisnickoIme() + '</td>' +
                        '<td>' + event.getId() + '</td>' );
                        if(event.getStatus()==true){
                        tr.append('<td>reserved</td>');
                    }
                        else{
                            tr.append('<td>quit</td>')
                        }
		        $('#allTickets').append(tr);
                }
            })
			},
		
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	
	})}
})





$(document).on('submit', '.filter', function(e){
    e.preventDefault();
    var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    var st = $(this).find("select[name=statusF]  option:selected").text();
    var ty = $(this).find("select[name=typeF]  option:selected").text();

   
    if(st!="All ticket types" || ty!="All ticket types"){

        $("#allTickets").find("tr:gt(0)").remove();         
	$.ajax({
		type : 'GET',
		url : rootURL,
		dataType : "json",
		success : function(result){
			//popuni tablu
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	        $.each(list, function(index, event) {
                let tf=true;
                if(st!="All ticket types" && st!=event.getStatus()){
                        tf=false;
                }
                if(ty!="All ticket types" && event.getType()!=ty  && tf){
                        tf=false;   
                }
                if(tf){

                    var tr = null;
                    tr = $('<tr></tr>');
                    tr.append('<td>' + event.getNazivmanifestacije() + '</td>' +
		                '<td>' + event.getCena()+ '</td>' +
		                '<td>' + event.getDatum() + '</td>' +
		                '<td>' + event.getKorisnickoIme() + '</td>' +
                        '<td>' + event.getId() + '</td>' );
                        if(event.getStatus()==true){
                        tr.append('<td>reserved</td>');
                    }
                        else{
                            tr.append('<td>quit</td>')
                        }
		        $('#allTickets').append(tr);
                }
            })
			},
		
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	
	})}
})


