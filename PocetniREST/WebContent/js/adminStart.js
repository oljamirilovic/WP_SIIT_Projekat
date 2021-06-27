var rootURL1 = "../rest/events/getEvents";
var rootURL2 = "../PocetniREST/rest/customers/searchUsername";
var rootURL3 = "../PocetniREST/rest/salesmen/searchUsername";
var rootURL4 = "../PocetniREST/rest/admins/searchUsername";
var rootURL5 = "../PocetniREST/rest/comments/getScore";
var rootURL6 = "../PocetniREST/rest/customers/add";
var rootURL7 = "../PocetniREST/rest/events/searchEvent";
var rootURL8 = "../PocetniREST/rest/events/setCurrentEvent";
var rootURL9 = "../PocetniREST/rest/customers/setCurrentCustomer";
var rootURL10 = "../PocetniREST/rest/salesmen/setCurrentSalesmen";
var rootURL11 = "../PocetniREST/rest/admins/setCurrentAdmin";
var rootURL12 = "../PocetniREST/rest/events/findEventsWithTitle";
var rootURL13 = "../PocetniREST/rest/events/addSearched";
var rootURL14 = "../PocetniREST/rest/events/setSearchClicked";


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
	console.log(data);
	removeTableContent();
		
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
													
													$.ajax({
														type : 'POST',
														url : rootURL11,
														contentType : 'application/json',
														dataType : "json",
														data :  JSON.stringify(result2),
														success :function(){
															
															//TODO admin window
															window.location.href = "http://localhost:8081/PocetniREST/html/adminStartUp.html";
														},
														error : function(XMLHttpRequest, textStatus, errorThrown){
															alert("AJAX ERROR: "+errorThrown);
														}
													});
													
													
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
												
												$.ajax({
													type : 'POST',
													url : rootURL10,
													contentType : 'application/json',
													dataType : "json",
													data :  JSON.stringify(result1),
													success :function(){
														
														//TODO salesmen window
														window.location.href = "http://localhost:8081/PocetniREST/html/salesmanStartUp.html";
													},
													error : function(XMLHttpRequest, textStatus, errorThrown){
														alert("AJAX ERROR: "+errorThrown);
													}
												});
												
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
									$.ajax({
										type : 'POST',
										url : rootURL9,
										contentType : 'application/json',
										dataType : "json",
										data :  JSON.stringify(result),
										success :function(){
											// opens customer window TODO set currentCustomer
											window.location.href = "http://localhost:8081/PocetniREST/html/customer.html";
										},
										error : function(XMLHttpRequest, textStatus, errorThrown){
											alert("AJAX ERROR: "+errorThrown);
										}
									});
									
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
		else{
			invalidInput("All fields are required! ","container");
		}
	})
	
//////////////////////////////////////////////////SIGN UP/////////////////////////////////////////////////////////////	
	
	
	
	
	///////////////////////////////////////////////////////SEARCH//////////////////////////////////////////////////////////////////////////////
	
	$('#searchBtn').click(function(e){
		var title = $('input[name=title]').val();
		var fromDate = $('input[name="fromdate"]').val();
		var toDate = $('input[name=todate]').val();
		var minPrice = $('input[name=minPrice]').val();
		var maxPrice = $('input[name=maxPrice]').val();
		
		
		if(title!=""){
			
			setSearchClicked();
			
			$.ajax({
				type : 'POST',
				url : rootURL12,
				contentType : 'application/json',
				dataType : "json",
				data :  JSON.stringify({
					"id" : title,
				}),
				success : function(result){
					if(result!=null){
						if(fromDate!="" || toDate!="" || minPrice!="" || maxPrice!="" || gsirina!="" || gduzina!=""){
						
							$.each(result, function(index, event){
								
								checkSearchParams(fromDate,toDate,minPrice,maxPrice,gduzina,gsirina,event);
							})
						}else if(fromDate=="" && toDate=="" && minPrice=="" && maxPrice=="" && gsirina=="" && gduzina==""){
							$.each(result, function(index, event){
								addSearchFilterEvent(event);
							})
						}
							
						findAll();
					}
					
				},
				error : function(XMLHttpRequest, textStatus, errorThrown){
					alert("AJAX ERROR: "+errorThrown);
				}
			});
			
		}else if(fromDate!="" || toDate!="" || minPrice!="" || maxPrice!="" || gsirina!="" || gduzina!=""){
			///
			$.ajax({
				type : 'GET',
				url : rootURL1,
				dataType : "json",
				success : function(data){
					var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
					
					setSearchClicked();
					
					$.each(list, function(index, event){
						
						checkSearchParams(fromDate,toDate,minPrice,maxPrice,gduzina,gsirina,event)
						
					})
					
					findAll();
					
				}
			});
		}
		
	})
	
	var modal;
	$('#signalSignUp').click(function(e){
        modal = document.getElementById('id02');
	})
	
	$('#signalLogin').click(function(e){
		modal = document.getElementById('id01');
	})
	
	$('#locationBtn').click(function(e){
		modal = document.getElementById('id03');
	})
	
	window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	//window.location.href = "http://localhost:8081/PocetniREST/html/adminStartUp.html";
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




function setSearchClicked(){
	$.ajax({
		type : 'POST',
		url : rootURL14,
		contentType : 'application/json',
		dataType : "json",
		success :function(){
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert("AJAX ERROR: "+errorThrown);
		}
	});
}

function removeTableContent(){
	var paras = document.getElementsByClassName("event-list");
	
		while(paras[0]) {
		    paras[0].parentNode.removeChild(paras[0]);
		}
	}

function checkSearchParams(fromDate,toDate,minPrice,maxPrice,gduzina,gsirina,event){
	if(fromDate!=""){
		if(Date.parse(fromDate) >= Date.parse(event.datumPocetka)){
			addSearchFilterEvent(event);
		}
	}
	if(toDate!=""){
		if(Date.parse(toDate) >= Date.parse(event.datumKraja)){
			addSearchFilterEvent(event);
		}
	}
	if(minPrice!=""){
		if(parseInt(minPrice)<=parseInt(event.cenaKarte)){
			addSearchFilterEvent(event);
		}
	}
	if(maxPrice!=""){
		if(parseInt(maxPrice)>=parseInt(event.cenaKarte)){
			addSearchFilterEvent(event);
		}
	}
	if(gduzina!=""){
		if(gduzina==parseInt(event.lokacija.geografskaDuzina)){
			addSearchFilterEvent(event);
		}
	}
	if(gsirina!=""){
		if(gsirina==parseInt(event.lokacija.geografskaSirina)){
			addSearchFilterEvent(event);
		}
	}
}


function addSearchFilterEvent(event){
	$.ajax({
		type: 'POST',
		url: rootURL13, 
		contentType: 'application/json',
		dataType : "json",
		data : JSON.stringify(event),
		success : function(result){
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown){
			alert("AJAX ERROR: "+errorThrown);
		}
	});
}
