var rootURL1 = "../PocetniREST/rest/events/getEvents";
var rootURL2 = "../PocetniREST/rest/customers/searchUsername";
var rootURL3 = "../PocetniREST/rest/salesmen/searchUsername";
var rootURL4 = "../PocetniREST/rest/admins/searchUsername";
var rootURL5 = "../PocetniREST/rest/comments/getScore";
var rootURL6 = "../PocetniREST/rest/customers/add";
var rootURL7 = "../PocetniREST/rest/events/searchEvent";
var rootURL8 = "../PocetniREST/rest/events/setCurrentEvent";

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

function showEvent(id){
	
	$.ajax({
		type : 'POST',
		url : rootURL7,
		contentType : 'application/json',
		dataType : "json",
		data :  JSON.stringify({
			"id" : id,
		}),
		success : function(result){
			if(result!=null){
				
				$.ajax({
					type : 'POST',
					url : rootURL8,
					contentType : 'application/json',
					dataType : "json",
					data :  JSON.stringify(result),
					success :function(){
						//TODO event window
						window.location.href = "http://localhost:8081/PocetniREST/html/unregEvent.html";
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
		});
}

function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	$.each(list, function(index, event) {
		//samo aktivne se prikazuju
		if(event.status){
	        var tr = $('<tr class="event-list"></tr>');
	        var d = new Date();
	        
	        tr.append('<td class="ac"><img width="100" height="120" class="lazyloaded" border="0" src="images/' + event.poster + '" alt="' + event.poster + '"></td>');
	        
	        tr.append('<td class="title ac va-c word-break"><a style="font-size: 18px" onclick= "showEvent(\''+event.naziv+'\')"  href=\"#\">' + event.naziv + '</a><br>Date: ' + event.datumPocetka + ' ' + event.vremePocetka + '<br>Ticket price: ' + event.cenaKarte +' dollars</td>');
	        	        
	        tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + event.lokacija.ulica + " " + event.lokacija.broj + '</a><br>' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</td>');
	        
	        tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + event.tipManifestacije + '</span></div></td>');
	        
	        //TODO check endTime
	        if(d > Date.parse(event.datumKraja)){
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
		if($('input[name=uname]').val()!="" && $('input[name=psw]').val()!= ""){
			
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
												invalidInput("Invalid username! ","container");
											}else{
												if($('input[name=psw]').val() == result2.lozinka){
													//TODO admin window
												}
												else{
													invalidInput("Invalid password! ","container");
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
												invalidInput("Account deactivated! ","container");
												
											}
											else if(result1.blokiran){
												invalidInput("Account blocked! ","container");
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
									invalidInput("Account deactivated! ","container");
									
								}
								else if(result.blokiran){ 
									invalidInput("Account blocked! ","container");
									
								}
								else{
									// opens customer window
									window.location.href = "http://localhost:8081/PocetniREST/html/customer.html";
								}
							}
							else{
								invalidInput("Invalid password! ","container");
								
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
		var psw = $("input[name=pswrd]").val();
		var name = $("input[name=name]").val();
		var surname = $("input[name=surname]").val();
		var bday = $("input[name=birthday]").val();
		var gender = $("select[name=gender]  option:selected").text();
		
		if(id=="" || psw=="" || name==""|| surname==""|| bday=="" ){
			invalidInput("All fields are required!","containers");
			
		}else {
			if(Date.parse(strDate) < Date.parse(bday)){
				invalidInput("Birthday invalid!","containers");
				
			}
			else{
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
						invalidInput("Username already exists!","containers");						
					}
					else{
					$.ajax({
						type: 'POST',
						url: rootURL3,
						contentType: 'application/json',
						dataType : "json",
						data : JSON.stringify({
							"id" : id,
						}),
						success : function(result1){
							if(result1!=null){
								invalidInput("Username already exists!","containers");								
							}
							else{
							$.ajax({
								type : 'POST',
								url : rootURL4,
								contentType : 'application/json',
								dataType : "json",
								data :  JSON.stringify({
									"id" : id,
								}),
								success : function(result2){
									if(result2!=null){
										invalidInput("Username already exists!","containers");
										
									}else{
										
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
								});	
							}
							
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
			});	
			}
		}		
	})
	
	var modal;
	$('#signalSignUp').click(function(e){
        modal = document.getElementById('id02');
	})
	
	$('#signalLogin').click(function(e){
		modal = document.getElementById('id01');
	})
	
	window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	
})

function invalidInput(mesg,cont){
	var reds = document.getElementsByClassName("red");
	
	if(reds.length != 0){
		for(var k = 0; k < reds.length; k++){
			reds[k].parentNode.removeChild(reds[k]);
		}								 
	}
        
	var elements = document.getElementsByClassName(cont);
	var div = document.createElement('div');
	div.className = 'red';
	div.textContent = mesg;
	div.id = "error";
	elements[0].append(div);
}


