var rootURL = "http://localhost:8080/PocetniREST/rest/events/add";
//var rootURL2 = "../PocetniREST/rest/users/getUsers";
var rootURL4 = "http://localhost:8080/PocetniREST/rest/events/exists";
//TODO datumi,zatim ono da iskoci kada se doda, i popraviti dugmice

$(document).ready(function(){
	
	$('#addM').click(function(e){ //btn na koji se klikne
		e.preventDefault();
		
		var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
				
		//TODOOproveri ovu proveru sa date
		if($("input[name=date]").val() != null && (Date.parse(strDate) > Date.parse($("input[name=date]").val()))
				&& t!=null && $("input[name=name]").val() != null
				&& $("input[name=price]").val() != null && $("input[name=SeetsNumber]").val() != null ){
			
			var id = $("input[name=name]").val();
			 
			$.ajax({
				type : 'POST',
				url : rootURL4, //proveri da li vec postoji
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : id,
				}),
				success : function(result){
					if(result==null){
						let data = { //namesti nov //TODO dodati i oljine atrribute??
								"naziv": $("input[name=name]").val(),
								"brojMesta": $("input[name=SeetsNumber]").val(),
								"cenaKarte": $("input[name=price").val(),
								"datumVreme": $("input[name=date]").val(),
								
							};
						
						
						$.ajax({
							type: 'POST',
							url: rootURL,
							contentType: 'application/json',
							dataType : "json",
							data : JSON.stringify(data),
							success : function(result){
								console.log(result);
								//TODO da ode na stranicu sa svim manifestacijama i da iskoci prozorce
								window.location.href = "http://localhost:8080/PocetniREST/AllManifestationView.html";
								},
							error : function(XMLHttpRequest, textStatus, errorThrown){ //TODO: sta ako je lokacija zauzeta?? 
								alert("AJAX ERROR: "+errorThrown);
							}				
						});
						
					}else{					
						var d = $('<div></div>');
						d.append('<p style="font-color:#ff0000;">'+'Manifestation with this name already exists!' + '</p>');
						$("body").append(d);
						
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("AJAX ERROR: " + errorThrown);
				}
			
			})
		}
		else if($("input[name=date]").val() == null || (Date.parse(strDate) < Date.parse($("input[name=date]").val()))
		&& t!=null && $("input[name=name]").val() != null
		&& $("input[name=[price]").val() != null && $("input[name=SeetsNumber]").val() != null 
		){
			var d = $('<div></div>');
			d.append('<p>'+'Not valid input.' + '</p>');
			$("body").append(d);
		}
	})
})
