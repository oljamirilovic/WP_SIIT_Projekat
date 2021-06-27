var rootURL = "../rest/salesmen/add";
//var rootURL2 = "../PocetniREST/rest/users/getUsers";
var rootURL1 = "../rest/salesmen/exists";
//povezano je sa htmlom, proveri za back


$(document).ready(function(){
	console.log("da")
	$('#addSeller').click(function(e){ //btn na koji se klikne
		console.log("uslo");
		alert("bane");
		e.preventDefault();
		
		var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
				
		
		if($("input[name=date]").val() != null && (Date.parse(strDate) > Date.parse($("input[name=date]").val()))
				&& d!=null && $("input[name=name]").val() != null
				&& $("input[name=lastName]").val() != null && $("input[name=Username]").val() != null && $("input[name=Password]").val() != null
				){
			
			var id = $("input[name=Username]").val();
			 console.log(id)
			$.ajax({
				type : 'POST',
				url : rootURL1, //proveri da li vec postoji
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : id,
				}),
				success : function(result){
					if(result==null){
						let data = { //namesti nov
								"name": $("input[name=name]").val(),
								"username": $("input[name=Username]").val(),
								"lastName": $("input[name=lastName]").val(),
								"date": $("input[name=date]").val(),
								"gender": $("select[name=gender]  option:selected").text(),
								"password": $("select[name=Password]").text()
							};
						
						
						$.ajax({
							type: 'POST',
							url: rootURL,
							contentType: 'application/json',
							dataType : "json",
							data : JSON.stringify(data),
							success : function(result){
								console.log(result);
								//TODO DODATI DA ISKOCI PROZORCE SA nekim podacima
								window.location.href = "http://localhost:8081/PocetniREST/html/ViewSellersByAdmin.html";
								},
							error : function(XMLHttpRequest, textStatus, errorThrown){
								alert("AJAX ERROR: "+errorThrown);
							}				
						});
						
					}else{					
						var d = $('<div></div>');
						d.append('<p style="font-color:#ff0000;">'+'User with this username already exists!' + '</p>');
						$("body").append(d);
						
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("AJAX ERROR: " + errorThrown);
				}
			
			})
		}
		else if($("input[name=date").val() == null || (Date.parse(strDate) < Date.parse($("input[name=date]").val()))
		&& d!=null && $("input[name=name]").val() != null
		&& $("input[name=lastName]").val() != null && $("input[name=Username]").val() != null && $("input[name=Password]").val() != null
		){
			var d = $('<div></div>');
			d.append('<p>'+'Not valid input.' + '</p>');
			$("body").append(d);
		}
	})
})
