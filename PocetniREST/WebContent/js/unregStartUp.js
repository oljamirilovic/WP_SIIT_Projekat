var rootURL1 = "../PocetniREST/rest/events/getEvents";
var rootURL2 = "../PocetniREST/rest/customers/searchUsername";
var rootURL3 = "../PocetniREST/rest/salesmen/searchUsername";
var rootURL4 = "../PocetniREST/rest/admins/searchUsername";
var rootURL5 = "../PocetniREST/rest/comments/getScore";
var rootURL6 = "../PocetniREST/rest/customers/add";

findAll();

function findAll() {
	console.log('findAll');
	$.ajax({
		type : 'GET',
		url : rootURL1,
		dataType : "json",
		success : renderList
	});
}

function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	$.each(list, function(index, event) {
		//samo aktivne se prikazuju
		if(event.status){
	        var tr = $('<tr class="event-list"></tr>');
	        var d = new Date();
	        
	        //img
	        tr.append('<td class="ac"><img width="100" height="120" class="lazyloaded" border="0" src="images/' + event.poster + '" alt="' + event.poster + '"></td>');
	        
	      //TODO href title
	        tr.append('<td class="title ac va-c word-break"><a style="font-size: 18px" href="' + '">' + event.naziv + '</a><br>Date: ' + event.datumVreme + '<br>Ticket price: ' + event.cenaKarte +' dollars</td>');
	        	        
	        tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + event.lokacija.ulica + " " + event.lokacija.broj + '</a><br>' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</td>');
	        
	        tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + event.tipManifestacije + '</span></div></td>');
	        	        	        
	        
	        if(d > Date.parse(event.datumVreme)){
	        	var id = event.naziv;
	        	
				$.ajax({
					type : 'POST',
					url : rootURL5,
					contentType : 'application/json',
					dataType : "json",
					data :  JSON.stringify({
						"id" : id,
					}),
					success : function(result1){
			        	tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>' + result1 + '</span></div></td>') 

					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert("AJAX ERROR: " + errorThrown);
					}
					});
	        	 	        	
	        }
	        else{
	        	tr.append('<td class="score ac fs14" ><div ><span class="text score-label score-na"><i class="far fa-star"></i>N/A</span></div></td>')
	        }
	        $('#eventTable').append(tr);
		}
	});
		
}

$(document).ready(function(){
	
	$('#loginBtn').click(function(e){
		if($('input[name=uname]').val()!=null && $('input[name=psw]').val()!=null){
			
			var id = $("input[name=uname]").val();
			
			//check customers
			$.ajax({
				type : 'POST',
				url : rootURL2,
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : id,
				}),
				success : function(result){
					if(result==null){
						
						//check salesman
						$.ajax({
							type : 'POST',
							url : rootURL3,
							contentType : 'application/json',
							dataType : "json",
							data :  JSON.stringify({
								"id" : id,
							}),
							success : function(result1){
								if(result1==null){
									
									//check admins
									$.ajax({
										type : 'POST',
										url : rootURL4,
										contentType : 'application/json',
										dataType : "json",
										data :  JSON.stringify({
											"id" : id,
										}),
										success : function(result2){
											if(result2==null){
												invalidInput("Invalid username! ");
											}else{
												if($('input[name=psw]').val() == result2.lozinka){
													//TODO admin window
												}
												else{
													invalidInput("Invalid password! ");
												}
											}
											
										},
										error : function(XMLHttpRequest, textStatus, errorThrown) {
											alert("AJAX ERROR: " + errorThrown);
										}
										});
								}else{
									
										if($('input[name=psw]').val() == result1.lozinka){
											
											if(result1.izbrisan){	
												invalidInput("Account deactivated! ");
												
											}
											else if(result1.blokiran){
												invalidInput("Account blocked! ");
											}
											else{
												//TODO salesmen window
											}
										}
										else{
											invalidInput("Invalid password! ");
										}
									}				
															
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								alert("AJAX ERROR: " + errorThrown);
							}
							});
						
					}else{
						
							if($('input[name=psw]').val() == result.lozinka){
								
								if(result.izbrisan){	
									invalidInput("Account deactivated! ");
									
								}
								else if(result.blokiran){ 
									invalidInput("Account blocked! ");
									
								}
								else{
									// opens customer window
									window.location.href = "http://localhost:8081/PocetniREST/html/customer.html";
								}
							}
							else{
								invalidInput("Invalid password! ");
								
							}
						}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					alert("AJAX ERROR: " + errorThrown);
				}
			});
		}
	})
	
//////////////////////////////////////////////////SIGN UP/////////////////////////////////////////////////////////////	
	
	$('#signupBtn').click(function(e){
		var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
		
		var id = $("input[name=username]").val();
		var psw = $("input[name=psw]").val();
		var name = $("input[name=name]").val();
		var surname = $("input[name=surname]").val();
		var bday = $("input[name=birthday]").val();
		var gender = $("select[name=gender]  option:selected").text();
		
		if(id==null || psw==null || name==null|| surname==null|| bday==null ){
			var d = $('<div></div>');
			d.append('<p><b>'+'All fields are required!' + '</b></p>');
			$('#containers').append(d);
		}else {
			if(Date.parse(strDate) < Date.parse(bday)){
			var d = $('<div></div>');
			d.append('<p><b>'+'Birthday invalid!' + '</b></p>');
			$('#containers').append(d);
			}
			
			$.ajax({
				type : 'POST',
				url : rootURL2,
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : id,
				}),
				success : function(result){
					if(result!=null){
						var d = $('<div></div>');
						d.append('<p><b>'+'Username already exists!' + '</b></p>');
						$('#containers').append(d);
					}
					else{
						//TODO create user and userPage
						let data = {
								"korisnickoIme": id,
								"lozinka": psw,
								"ime": name,
								"prezime": surname,
								"pol": gender,
								"datumRodjenja": bday
							};
						
						$.ajax({
							type: 'POST',
							url: rootURL6,
							contentType: 'application/json',
							dataType : "json",
							data : JSON.stringify(data),
							success : function(result){
								console.log(result);
								window.location.href = "http://localhost:8081/PocetniREST/html/customer.html";
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
			})
			
		}
		
		
		//window.location.href = "http://localhost:8080/PocetniREST/signup.html";
	})
})

function invalidInput(mesg){
	var reds = document.getElementsByClassName("red");
	
	if(reds.length != 0){
		for(var k = 0; k < reds.length; k++){
			reds[k].parentNode.removeChild(reds[k]);
		}								 
	}
        
	var elements = document.getElementsByClassName("container");
	var div = document.createElement('div');
	div.className = 'red';
	div.textContent = mesg;
	div.id = "error";
	elements[0].append(div);
}


