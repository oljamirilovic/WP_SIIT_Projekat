var rootURL = "../rest/salesmen/add";
//var rootURL2 = "../PocetniREST/rest/users/getUsers";
var rootURL1 = "../rest/salesmen/exists";
//povezano je sa htmlom, proveri za back


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
	$('#newSalesmen').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/MakeSeller.html";
	})	
	
	
	$('#addSeller').click(function(e){ //btn na koji se klikne
		
		
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
								if(result!=null){
								console.log(result);
								//TODO DODATI DA ISKOCI PROZORCE SA nekim podacima
								window.location.href = "http://localhost:8081/PocetniREST/html/ViewSellersByAdmin.html";}
								else{
									invalidInput("Invalid username!","anime-detail-header-stats di-tc va-t");	
								}
								},
							error : function(XMLHttpRequest, textStatus, errorThrown){
								alert("AJAX ERROR: "+errorThrown);
							}				
						});
						
					}else{					
						invalidInput("Invalid username!","anime-detail-header-stats di-tc va-t");	
						
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
		){ if($("input[name=date").val() == null){
			invalidInput("Invalid birthday!","anime-detail-header-stats di-tc va-t");
		}else{
			if( (Date.parse(strDate) < Date.parse($("input[name=date]").val()))){
				invalidInput("Invalid birthday!","anime-detail-header-stats di-tc va-t");
			}
		}
		invalidInput("Invalid informations!","anime-detail-header-stats di-tc va-t");
		}
	})
})
