var rootURL12 = "../../PocetniREST/rest/events/getCurrentEvent";
var rootURL13 = "../../PocetniREST/rest/comments/getScore";

var rootURL1 = "../../PocetniREST/rest/events/getEvents";
var rootURL2 = "../../PocetniREST/rest/customers/searchUsername";
var rootURL3 = "../../PocetniREST/rest/salesmen/searchUsername";
var rootURL4 = "../../PocetniREST/rest/admins/searchUsername";
var rootURL5 = "../../PocetniREST/rest/comments/getScore";
var rootURL6 = "../../PocetniREST/rest/customers/add";
var rootURL7 = "../../PocetniREST/rest/events/searchEvent";
var rootURL8 = "../../PocetniREST/rest/events/setCurrentEvent";
var rootURL9 = "../../PocetniREST/rest/customers/setCurrentCustomer";
var rootURL10 = "../../PocetniREST/rest/salesmen/setCurrentSalesmen";
var rootURL11 = "../../PocetniREST/rest/admins/setCurrentAdmin";

findAll();

function findAll() {
    console.log('findAll');
    $.ajax({
        type : 'GET',
        url : rootURL12,
        dataType : "json",
        success : renderResult
    });
}

function renderResult(data){
	var event = data;
	
	$('#title').append('<h3 class="title" style="font-size: 20px; text-align: center;">'+ event.naziv +'</h3>')
		
	var checkPoster=event.poster.substr(event.poster.length - 4)
	if(checkPoster==".jpg" || checkPoster==".png"){
		$('#poster').append('<img width="225" height="319" class="lazyloaded" data-src="../images/' + event.poster + '" src="../images/' + event.poster + '" alt="' + event.poster + '"itemprop="image">');
	
	}else{
		$('#poster').append('<img width="225" height="319"  src="data:image/png;base64,'+event.poster+'" alt="Red dot" >');
	}	
	var d = new Date();//TODO check endTime
	if(d > Date.parse(event.datumKraja)){
    	var id = event.naziv;
    	
		$.ajax({
			type : 'POST',
			url : rootURL13,
			contentType : 'application/json',
			dataType : "json",
			data :  JSON.stringify({
				"id" : id,
			}),
			success : function(result1){
				$('#score').append('<div class="score-label score-9" style="margin-left: 24px;">' + result1 + '</div>');
				$('#status').append('<div class="score-label score-9">Inactive</div>');
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX ERROR: " + errorThrown);
			}
			});
    	 	        	
    }
    else{
    	$('#score').append('<div class="score-label score-9" style="margin-left: 24px;">N/A</div>');
    	if(event.status){
			$('#status').append('<div class="score-label score-9">Active</div>');
		}    		
		else{
			$('#status').append('<div class="score-label score-9">Inactive</div>');
		}
    }
	
	$('#type').append('<div class="score-label score-9" >'+ event.tipManifestacije +'</div>');
	$('#seats').append('<div class="score-label score-9" >'+ event.brojMesta +'</div>');
	
	$('#startDate').append('<div class="score-label score-9" style="margin-left: 24px;">' + event.datumPocetka+ ' '+ event.vremePocetka + '</div>'); 
	$('#endDate').append('<div class="score-label score-9" >'+ event.datumKraja + ' ' + event.vremeKraja +'</div>');
		
	$('#regularTickets').append('<span class="numbers ranked" ><strong>Regular ticket:</strong></span>');
	$('#regularTickets').append('<span class="numbers popularity" style="margin-left: 2px;"><strong>'+ event.cenaKarte +'</strong>dollars</span>');
	$('#regularTickets').append('<span class="numbers members"><strong>'+ event.preostaloRegular + '</strong>left</span>'); 
	
	$('#vipTickets').append('<span class="numbers ranked" ><strong>VIP ticket:</strong></span>');
	$('#vipTickets').append('<span class="numbers popularity" style="margin-left: 33px;"><strong>'+ event.cenaKarte*2 + '</strong>dollars</span>');
	$('#vipTickets').append('<span class="numbers members"><strong>' + event.preostaloVip +'</strong>left</span>'); 
	
	$('#fanPit').append('<span class="numbers ranked" ><strong>FAN PIT ticket:</strong></span>');
	$('#fanPit').append('<span class="numbers popularity"><strong>'+ event.cenaKarte*4 + '</strong>dollars</span>');
	$('#fanPit').append('<span class="numbers members"><strong>' + event.preostaloFanpit +'</strong>left</span>'); 
	
	$('#location').append('<span class="numbers ranked" ><strong>Location:</strong></span>');
	$('#location').append('<span class="numbers popularity"><strong>' + event.lokacija.ulica + " " + event.lokacija.broj +'</strong></span>');
	$('#location').append('<span class="numbers members">' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</span>');
	$('#location').append('<span class="numbers members"><button type="button" class="locationRow" style="" onclick="document.getElementById(\'id03\').style.display=\'block\'" id="'+ event.lokacija.geografskaDuzina + ' ' + event.lokacija.geografskaSirina +'" ><i class="fa fa-globe-americas"></i></button></span>');
	
	
}

function myFunction() {
	var x = document.getElementById("psw");
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
}

function myFunction2() {
	var x = document.getElementById("pswrd");
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
}

var graphic = null;

$(document).ready(function(){
	
///////////////////////////////////////LOGIN////////////////////////////////////////////////////

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
											invalidInput("Invalid password! ","container");
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
				url : rootURL2, //"../PocetniREST/rest/customers/searchUsername";
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
						url: rootURL3, //"../PocetniREST/rest/salesmen/searchUsername";
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
								url : rootURL4, //"../PocetniREST/rest/admins/searchUsername";
								contentType : 'application/json',
								dataType : "json",
								data :  JSON.stringify({
									"id" : id,
								}),
								success : function(result2){
									if(result2!=null){
										invalidInput("Username already exists!","containers");
										
									}else{
										
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
											url: rootURL6, //"../PocetniREST/rest/customers/add";
											contentType: 'application/json',
											dataType : "json",
											data : JSON.stringify(data),
											success : function(result){
												
												$.ajax({
													type : 'POST',
													url : rootURL9, //"../PocetniREST/rest/customers/setCurrentCustomer";
													contentType : 'application/json',
													dataType : "json",
													data :  JSON.stringify(result),
													success :function(){
														
														window.location.href = "http://localhost:8081/PocetniREST/html/customer.html";
													},
													error : function(XMLHttpRequest, textStatus, errorThrown){
														alert("AJAX ERROR: "+errorThrown);
													}
												});
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
	var overlay;
	var closer, lon, lat;

	$("#detailsTable").on('click', '.locationRow', function (){		
		var ret = $(this).attr('id').split(" ");
		lat = ret[1];
		lon = ret[0];

		map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));

		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
					})
				]
			})
		});

		if(graphic != null){
			map.removeLayer(graphic);			
		}
		graphic = layer;
		map.addLayer(layer);

		var container = document.getElementById('popup');
        closer = document.getElementById('popup-closer');

        overlay = new ol.Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
		fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
			return response.json();
			}).then(function(json) {
			//document.getElementById('address').innerHTML = json.display_name;
			var tempcontent = document.getElementById('popup-content');
			tempcontent.innerHTML = '<b>' + json.address.road +" "+json.address.house_number+"</b><br />"+json.address.city+" "+json.address.postcode;
			
		})
		overlay.setPosition(ol.proj.fromLonLat([lon, lat]));
        map.addOverlay(overlay);

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
		modal = document.getElementById('id03');
	})

	map.on('singleclick', function (event) {
		var content = document.getElementById('popup-content');
		if (map.hasFeatureAtPixel(event.pixel) === true) {
			var coordinate = event.coordinate;
			fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
			return response.json();
			}).then(function(json) {
			//document.getElementById('address').innerHTML = json.display_name;
			content.innerHTML = '<b>' + json.address.road +" "+json.address.house_number+"</b><br />"+json.address.city+" "+json.address.postcode;
			
			})
			overlay.setPosition(coordinate);
		} else {
			overlay.setPosition(undefined);
			closer.blur();
		}
	});
		
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
