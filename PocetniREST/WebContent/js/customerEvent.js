var rootURL1 = "../../PocetniREST/rest/events/getCurrentEvent";
var rootURL2 = "../../PocetniREST/rest/comments/getScore";
var rootURL3 = "../../PocetniREST/rest/comments/getCommentsForEvent";
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
		
	$('#poster').append('<img width="225" height="319" class="lazyloaded" data-src="../images/' + event.poster + '" src="../images/' + event.poster + '" alt="' + event.poster + '"itemprop="image">');
		
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
					if(comments[i].odobren && !comments[i].obrisan){
						
						$('#reviews').append('<div class="borderDark" style="padding: 4px 0;"><div class="spaceit"><div class="mb8" style="float: right; text-align: right;">'+                                                    
                                                      comments[i].ocena +'</div></div>'+
                                                     '<div style="float: left;"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><a href="#">'+
                                                     comments[i].imeKupca+'</a></td></tr></tbody></table></div></div>'+
                                                     '<div class="spaceit textReadability word-break pt8 mt8" style="clear: both; border-top: 1px solid #ebebeb;">' +
                                                     comments[i].text + '</div></div>');
					}
				}
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("AJAX ERROR: " + errorThrown);
		}
		});
	
	
	//add comment 
	
	$.ajax({
        type : 'GET',
        url : rootURL4,
        dataType : "json",
        success : function(currentCustomer){
        	customer = currentCustomer;
        	
        	$.ajax({
                type : 'POST',
                url : rootURL7,
                contentType : 'application/json',
                dataType : "json",
                data :  JSON.stringify({ "id" : currentCustomer.korisnickoIme,}),
                success : function(karte){
                	var exists = false;
                	var d = new Date();
                	if(karte != null) {
                		
            			for (var i =0; i< karte.length ; i++) {
            				if(karte[i].nazivmanifestacije == id && karte[i].status && (d > Date.parse(event.datumKraja))) {
            					exists = true;
            					break;
            				}
            			}
            		}
                	
                	if(exists){
                		//$('#leftbar').append('<div class="profileRows pb0" ><button type="button" onclick="document.getElementById(\'id02\').style.display=\'block\'" id="signalComment" >Add comment</button>');
                		document.getElementById('signalComment').style.display = "block";
                	}else{
                		document.getElementById("signalComment").style.display = "none";
                	}
                }
            });
        	
        	//reserve ticket	
        	
        	var preostalo = parseInt(event.preostaloRegular) + parseInt(event.preostaloVip) + parseInt(event.preostaloFanpit);
        	if( (Date.parse(event.datumKraja) >= d) && preostalo > 0){
        		numReserved = 0;
        		document.getElementById('signalBuyTicket').style.display = "block";
        		
        		if(parseInt(event.preostaloRegular) >0){
        			
        			$('#ticketType').append('<option>Regular</option>');
        			
        		}
        		if(parseInt(event.preostaloFanpit) >0){
        			
        			$('#ticketType').append('<option>FAN PIT</option>');
        			
        		}
		  		if(parseInt(event.preostaloVip) >0){
        			
        			$('#ticketType').append('<option>VIP</option>');
        			
        		}
        		
        	}else{
        		document.getElementById("signalBuyTicket").style.display = "none";
        	}
        	
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
	
	$('#signalComment').click(function(e){
		modal = document.getElementById('id02');
	})
	
	$('#signalBuyTicket').click(function(e){
		modal = document.getElementById('id04');
		
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
	
	$('#addTicket').click(function(e){
		numOfTickets = $('input[name=numOfTickets]').val();
		ticketType = $("select[name=ticketType]  option:selected").text();
		
		if(numOfTickets=="" || ticketType==""){
			invalidInput("All fields are required!","containers",1);
			
		}else if(numOfTickets!="" && ticketType!=""){
			
				if((ticketType=="Regular") && (parseInt(event.preostaloRegular) < parseInt(numOfTickets))){
					invalidInput("Sorry, only " + event.preostaloRegular + " tickets available","containers",1);
				}
				else if((ticketType=="VIP") && (parseInt(event.preostaloVip) < parseInt(numOfTickets))){
					invalidInput("Sorry, only " + event.preostaloVip + " tickets available","containers",1);
				}
				else if((ticketType =="FAN PIT") && (parseInt(event.preostaloFanpit) < parseInt(numOfTickets))){
					invalidInput("Sorry, only " + event.preostaloFanpit + " tickets available","containers",1);
				}
				else{
					invalidInput(" ","containers",1);
					
					if(ticketType=="Regular"){
						ticketPrice = event.cenaKarte;
						event.preostaloRegular--;
					}
					else if(ticketType=="VIP"){
						ticketPrice = event.cenaKarte*4;
						event.preostaloVip--;
					}
					else if(ticketType=="FAN PIT"){
						ticketPrice = event.cenaKarte*2;
						event.preostaloFanpit--;
					}
					for(var i = 0; i < numOfTickets; i++){
						numReserved += 1;
						var forma = $('<form method="get" class="reservedTicketForm" action=""></form>');
				        var tr = $('<tr></tr>');
				        tr.append('<td>' + ticketType+ '</td>'+'<td>' + ticketPrice+ '</td>');
				        forma.append(
				                '<input type="hidden" name="reservedTypeId" value="'+ ticketType+'_'+numReserved +'">' +
				                '<button class="deleteTableRowBtn" id="'+ ticketType+'_'+numReserved +'" >Remove ticket</button>');
				        var td = $('<td></td>');
				        td.append(forma);
				        tr.append(td);
				        $('#cartTable').append(tr);
				        
				        $.ajax({
							type: 'POST',
							url: rootURL10, 
							contentType: 'application/json',
							dataType : "json",
							data : JSON.stringify({
								"type" : ticketType,
							}),
							success : function(){
							},error : function(XMLHttpRequest, textStatus, errorThrown){
								alert("AJAX ERROR: "+errorThrown);
							}				
						});
					}
					
										
				}
			
		}
		
	})
	
	$('#buyTicketBtn').click(function(e){
		
		$.ajax({
	        type : 'GET',
	        url : rootURL12,
	        dataType : "json",
	        success : function(data){
	        	if(data==0){
	        		invalidInput("Cart is empty.No tickets were chosen!","containers", 1);
	        	}else{	        		
	        		modal.style.display = "none";
	    			modal = document.getElementById('id05');
	    			document.getElementById('id05').style.display='block';
	    			showTotalCost();
	        	}
	        },
	        error : function(XMLHttpRequest, textStatus, errorThrown){
				alert("AJAX ERROR: "+errorThrown);
			}
	    });
		
		
	})
	
	$('#ticketCancelBtn').click(function(e){
		numReserved = 0;
		
		$("#cartTable tr").remove();
		var tr = $('<tr class="table-header"></tr>');
		tr.append('<td >Type</td><td >Price</td><td >&nbsp;</td>');
		$('#cartTable').append(tr);
		
		//remove all temp reserved
		$.ajax({
			type: 'POST',
			url: rootURL14, 
			contentType: 'application/json',
			dataType : "json",
			success : function(){},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert("AJAX ERROR: "+errorThrown);
			}				
		});
		
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
	
	$('#confirmTicketBtn').click(function(e){
		
		
		$.ajax({
			type: 'POST',
			url: rootURL15, //addAllReservedAndSetCustomerPoints
			contentType: 'application/json',
			dataType : "json",
			success : function(){},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert("AJAX ERROR: "+errorThrown);
			}				
		});
				
		document.getElementById('id05').style.display = "none";
		numReserved = 0;		
		$("#cartTable tr").remove();
		var tr = $('<tr class="table-header"></tr>');
		tr.append('<td >Type</td><td >Price</td><td >&nbsp;</td>');
		$('#cartTable').append(tr);
		
		location.reload(true);
		
	})
	
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
	
})


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
