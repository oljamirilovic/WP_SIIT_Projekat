var rootURL1 = "../../PocetniREST/rest/events/getCurrentEvent";
var rootURL2 = "../../PocetniREST/rest/comments/getScore";
var rootURL3 = "../../PocetniREST/rest/comments/getCommentsForEventAll";
var rootURL4 = "../../PocetniREST/rest/customers/getCurrentCustomer";
var rootURL5 = "../../PocetniREST/rest/customers/searchTicketStatus";
var rootURL6 = "../../PocetniREST/rest/comments/add";
var rootURL7 = "../../PocetniREST/rest/tickets/searchOwner";
var rootURL8 = "../../PocetniREST/rest/tickets/add";
var rootURL9 = "../../PocetniREST/rest/customers/setCustomerPoints";
var rootURL10 = "../../PocetniREST/rest/customers/addTempReservedTicketTypes";
var rootURL11 = "../../PocetniREST/rest/customers/removeTempReservedTicketTypes";
var rootURL12 = "../../PocetniREST/rest/customers/getTempReservedTicketNumber";
var rootURL13 = "../../PocetniREST/rest/events/getTotalCost";
var rootURL14 = "../../PocetniREST/rest/customers/removeAllTempReservedTicketTypes";
var rootURL15 = "../../PocetniREST/rest/tickets/addAllReservedAndSetCustomerPoints";

findAll();

var event;
var customer;
var numReserved;

function findAll() {
    console.log('findAll');
    $.ajax({
        type : 'GET',
        url : rootURL1,
        dataType : "json",
        success : renderResult
    });
}

function renderResult(data){
	event = data;
	
	var id = event.naziv;
	
	$('#title').append('<h3 class="title" style="font-size: 20px; text-align: center;">'+ event.naziv +'</h3>')
		
	var checkPoster=event.poster.substr(event.poster.length - 4)
	if(checkPoster==".jpg" || checkPoster==".png"){
		$('#poster').append('<img width="225" height="319" class="lazyloaded" data-src="../images/' + event.poster + '" src="../images/' + event.poster + '" alt="' + event.poster + '"itemprop="image">');
	
	}else{
		$('#poster').append('<img width="225" height="319"  src="data:image/png;base64,'+event.poster+'" alt="Red dot" >');
	}	
	var d = new Date();//TODO check endTime
	if(d > Date.parse(event.datumKraja)){
    	    	
		$.ajax({
			type : 'POST',
			url : rootURL2,
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
    	$('#status').append('<div class="score-label score-9">Active</div>');
    }
	
	$('#type').append('<div class="score-label score-9" >'+ event.tipManifestacije +'</div>');
	$('#seats').append('<div class="score-label score-9" >'+ event.brojMesta +'</div>');
	
	$('#startDate').append('<div class="score-label score-9" style="margin-left: 24px;">' + event.datumPocetka+ ' '+ event.vremePocetka + '</div>'); 
	$('#endDate').append('<div class="score-label score-9" >'+ event.datumKraja + ' ' + event.vremeKraja +'</div>');
		
	$('#regularTickets').append('<span class="numbers ranked" ><strong>Regular ticket:</strong></span>');
	$('#regularTickets').append('<span class="numbers popularity" style="margin-left: 2px;"><strong>'+ event.cenaKarte +'</strong>dollars</span>');
	$('#regularTickets').append('<span class="numbers members"><strong>'+ event.preostaloRegular + '</strong>left</span>'); 
		
	$('#fanPit').append('<span class="numbers ranked" ><strong>FAN PIT ticket:</strong></span>');
	$('#fanPit').append('<span class="numbers popularity"><strong>'+ event.cenaKarte*2 + '</strong>dollars</span>');
	$('#fanPit').append('<span class="numbers members"><strong>' + event.preostaloFanpit +'</strong>left</span>'); 	

	$('#vipTickets').append('<span class="numbers ranked" ><strong>VIP ticket:</strong></span>');
	$('#vipTickets').append('<span class="numbers popularity" style="margin-left: 33px;"><strong>'+ event.cenaKarte*4 + '</strong>dollars</span>');
	$('#vipTickets').append('<span class="numbers members"><strong>' + event.preostaloVip +'</strong>left</span>'); 
	
	$('#location').append('<span class="numbers ranked" ><strong>Location:</strong></span>');
	$('#location').append('<span class="numbers popularity"><strong>' + event.lokacija.ulica + " " + event.lokacija.broj +'</strong></span>');
	$('#location').append('<span class="numbers members">' + event.lokacija.mesto + " " + event.lokacija.postanskiBroj +'</span>');
	
	//display comments
	$.ajax({
		type : 'POST',
		url : rootURL3,
		contentType : 'application/json',
		dataType : "json",
		data :  JSON.stringify({
			"id" : id,
		}),
		success : function(comments){
			if(comments!=null){
				$('#reviews').append('<div><span class="floatRightHeader"></span><span class="floatRightHeader"><a >Scores</a></span><h2>Comments</h2></div>');
				for(var i = 0; i<comments.length; i++){
					console.log(comments[i].text)
					if(comments[i].odobren && !comments[i].obrisan){
						
						$('#reviews').append('<div class="borderDark" style="padding: 4px 0;"><div class="spaceit"><div class="mb8" style="float: right; text-align: right;">'+                                                    
                                                      comments[i].ocena +'</div></div>'+
                                                     '<div style="float: left;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><a href="#">'+
                                                     comments[i].imeKupca+'</a></td></tr></tbody></table></div></div>'+
                                                     '<div class="spaceit textReadability word-break pt8 mt8" style="clear: both; border-top: 1px solid #ebebeb;">' +
                                                     comments[i].text + '</div></div>');
					}
					else if(!comments[i].odobren && !comments[i].obrisan){
						
						$('#reviews').append('<div class="borderDark" style="padding: 4px 0;"><div class="spaceit"><div class="mb8" style="float: right; text-align: right;">'+                                                    
                                                      comments[i].ocena +'</div></div>'+
                                                     '<div style="float: left;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><a href="#">'+
                                                     comments[i].imeKupca+'</a></td></tr></tbody></table></div></div>'+
                                                     '<div class="spaceit textReadability word-break pt8 mt8" style="clear: both; border-top: 1px solid #ebebeb;">' +
                                                     comments[i].text + '</div></div><div><button type="submit" id="approve'+comments[i].id+'">Odobri</button><button type="submit" id="obrisi" >Obrisi</button></div>');
					}
					else{
						$('#reviews').append('<div class="borderDark" style="padding: 4px 0;"><div class="spaceit"><div class="mb8" style="float: right; text-align: right;">'+                                                    
                                                      comments[i].ocena +'</div></div>'+
                                                     '<div style="float: left;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><a href="#">'+
                                                     comments[i].imeKupca+'</a></td></tr></tbody></table></div></div>'+
                                                     '<div class="spaceit textReadability word-break pt8 mt8" style="clear: both; border-top: 1px solid #ebebeb;">' +
                                                     comments[i].text + '</div></div> <div>OBRISAN komentar</div>');
					
					}
					
				}
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
		});
	
	
	
	
	
	
}

$(document).ready(function(){
	
	$('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/customerAccount.html";
	})
	
	var modal;
	
	$('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})
	
	
	
	if(numReserved > 0){
		modal = document.getElementById('id04');
	}
	
	window.onclick = function(event) {
		if(numReserved > 0){
			modal = document.getElementById('id04');
		}
		else if (event.target == modal) {
            modal.style.display = "none";
        }
    }
	
	//////////////////////////////////////////////ADD COMMENT//////////////////////////////////////////////////////////
	
	$('#confirmBtn').click(function(e){
		var text = $('input[name=comment]').val();
		var score = $('input[name=personalScore]').val();
		
		if(text!="" && score!= ""){
			
			$.ajax({
		        type : 'GET',
		        url : rootURL1,
		        dataType : "json",
		        success : function(currEvent){
		        	
		        	$.ajax({
				        type : 'GET',
				        url : rootURL4,
				        dataType : "json",
				        success : function(currCustomer){
				        	
				        	var newComment = {
				        			"kupac": currCustomer,
									"text" : text,
									"ocena" : score,
									"manifestacija" : currEvent,
									"odobren" : false,
									"obrisan" : false,
									"imeKupca" : currCustomer.korisnickoIme,
									"imeManifestacije" : currEvent.naziv
							};
				        	
				        	$.ajax({
								type: 'POST',
								url: rootURL6, 
								contentType: 'application/json',
								dataType : "json",
								data : JSON.stringify(newComment),
								success : function(cmnt){
									modal.style.display = "none";
									modal = document.getElementById('id03');
									document.getElementById('id03').style.display='block';
								},error : function(XMLHttpRequest, textStatus, errorThrown){
									alert("AJAX ERROR: "+errorThrown);
								}				
							});
				        	
				        }
				    });
		        	
		        }
		    });
						
			
		}else{
			invalidInput("Cant leave empty comment! ","containers",0);
		}
	})
	
	/////////////////////////////////////BUY TICKETS/////////////////////////////////////////////////////////////////////////
	
	var numOfTickets;
	var ticketType;
	var ticketPrice;
	
	
		//reset event
		$.ajax({
	        type : 'GET',
	        url : rootURL1,
	        dataType : "json",
	        success : function(data){
	        	event = data;
	        }
	    });
		
	})
	
	//////////////////////////////////CONFIRM RESERVATION/////////////////////////////////////////////////////////////////////////////
	
	
	
	//remove temp reserved ticket from table
	
	$("#cartTable").on('click', '.deleteTableRowBtn', function () {
		numReserved = numReserved -1;
	    var type = $(this).attr('id');
	    $(this).closest('tr').remove();
	    
	    $.ajax({
			type: 'POST',
			url: rootURL11, 
			contentType: 'application/json',
			dataType : "json",
			data : JSON.stringify({
				"type" : type,
			}),
			success : function(){},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert("AJAX ERROR: "+errorThrown);
			}				
		});
	    
	});
	



function showTotalCost(){
	
	$.ajax({
        type : 'GET',
        url : rootURL13,
        dataType : "json",
        success : function(data){
        	if(data==0){
        		invalidInput("Cart is empty.No tickets were chosen!","containers",1);
        	}else{
        		var discount = customer.tip.popust/100;        		
        		var withDiscount = data-data*discount;
        		
        		$('#imgcontainer').append('<h2 style="text-align: center;font-size: 20px;">Total tickets reserved: '+ numReserved +' </h2>');
        		$('#imgcontainer').append('<h2 style="text-align: center;font-size: 20px;">Total cost with discount: '+ withDiscount +' dollars</h2>');
        	}
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
			alert("AJAX ERROR: "+errorThrown);
		}
    });
	
	
}

function invalidInput(mesg,cont, index){
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
	elements[index].append(div); //index 0 je comments prozor, index 1 je tickets prozor
}
