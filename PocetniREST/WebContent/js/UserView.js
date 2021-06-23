///get,  , i ako je admin, da ima dodatno polje za sumnjive
//TODO: dodati za ostale korisnike?? dodati rooturl i te gluposti

$(document).on('submit', '.search', function(e){
    e.preventDefault();
    var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
    var username = $(this).find("input[name=username]").val();
    var name = $(this).find("input[name=name]").val();
    var lastName = $(this).find("input[name=lastname]").val();
    
    if(name != null || username!=null || lastName!=null ){
 
	$.ajax({
		type : 'GET',
		url : rootURL,
		dataType : "json",
		success : function(result){
			//popuni tablu
			var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	        $.each(list, function(index, event) {
                let tf=true;
                if(username!=null){
                    if(event.getKorisnickoIme()!=username){
                        tf=false;
                    }
                }
                
                if(lastName!=null  && tf){
                    if(lastName!=event.getPrezime()){
                        tf=false;
                    }
                }
                if(name!=null  && tf){
                    if(name!=event.getIme()){
                        tf=false;
                    }
                }
                if(tf){
                        //morace odvojeno tabela za prodavce i odvojeno za kupce, jer ne postoji nacin da dobavim sve korisnike odjednom
                        //
                    var tr = null;
                    tr = $('<tr></tr>');
                    tr.append('<td>' + event.getIme() + '</td>' +
		                '<td>' + event.getPrezime()+ '</td>' +
		                '<td>' + event.getKorisnickoIme() + '</td>' +
		                '<td>' + event.getKarte().length() + '</td>' +
                        '<td>' + event.getTip().getTipKupca()+ '</td>' );
                        if(event.status()==true){
                        tr.append('<td>reserved</td>');
                    }
                        else{
                            tr.append('<td>quit</td>')
                        }
		        $('#ConsumesTable').append(tr);
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
                if(st!="All user types" && st!=event.getStatus()){
                        tf=false;
                }
                if(ty!="All user types" && event.getType()!=ty  && tf){
                        tf=false;  //ovde bi trebalo samo pozvazti jedno, a ostali da se sklone?? 
                }
                if(tf){

                    var tr = null;
                    tr = $('<tr></tr>');
                    tr.append('<td>' + event.getIme() + '</td>' +
		                '<td>' + event.getPrezime()+ '</td>' +
		                '<td>' + event.getKorisnickoIme() + '</td>' +
		                '<td>' + event.getKarte().length() + '</td>' +
                        '<td>' + event.getTip().getTipKupca()+ '</td>' );
                        if(event.status()==true){
                        tr.append('<td>reserved</td>');
                    }
                        else{
                            tr.append('<td>quit</td>')
                        }
		        $('#ConsumesTable').append(tr);
                }
            })
			},
		
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
	
	})}
})


