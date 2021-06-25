var rootURL1 = "../../PocetniREST/rest/customers/getCurrentCustomer";
var rootURL2 = "../../PocetniREST/rest/tickets/searchOwner";
var rootURL3 = "../../PocetniREST/rest/events/searchEvent";
var rootURL4 = "../../PocetniREST/rest/events/setCurrentEvent";
var rootURL5 = "../../PocetniREST/rest/tickets/cancelReservedTicket";

var beforeFilter = [];
var afterTicketTypeFilter = [];
var onlyReservedTickets = false;

findAll();

function findAll() {
	$.ajax({
        type : 'GET',
        url : rootURL1,
        dataType : "json",
        success : function(result){                            
            $.ajax({
				type: 'POST',
				url: rootURL2, 
				contentType: 'application/json',
				dataType : "json",
				data : JSON.stringify({
					"id" : result.korisnickoIme,
				}),
                success : renderResult
            });
        },
        error : function(XMLHttpRequest, textStatus, errorThrown){
            alert("AJAX ERROR: "+errorThrown);
        }
    });
}

function renderResult(data){
    var list = data == null ? [] : (data instanceof Array ? data : [ data ]);

    $.each(list, function(index, ticket) {
        var tr = $('<tr class="event-list"></tr>');
        var date = new Date();

        if(!ticket.izbrisana){
            var status = ticket.status ? "RESERVED" : "CANCELLED";

            tr.append('<td class="title ac va-c word-break"><a style="font-size:18px">' + ticket.id + '</a></td>');
                    
            tr.append('<td class="title ac va-c word-break"><a style="font-size: 18px" onclick= "showEvent(\''+ticket.nazivmanifestacije+'\')"  href=\"#\">' + ticket.nazivmanifestacije + '</a></td>');
                        
            tr.append('<td class="title ac va-c word-break">' + ticket.datum + '</td>');

            tr.append('<td class="title ac va-c word-break">' + ticket.cena +' </td>');
            
            tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + ticket.tipKarte + '</span></div></td>');

            tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span>' + status + '</span></div></td>');
            
            date.setDate(date.getDate() + 7);
            if(ticket.status && (Date.parse(ticket.datum) >= date))
                tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ><button class="deleteTableRowBtn" onclick="document.getElementById(\'id02\').style.display=\'block\'" id="'+ ticket.id +'" ><i class="far fa-window-close"></i></button></span></div></td>');
			else
			tr.append('<td class="score ac fs14"><div><span class="text score-label score-na" ></span></div></td>');
            
            $('#ticketsTable').append(tr);
        }

    })

	var temp = document.getElementById("ticketsTable").getElementsByTagName("tr");
	for (i = 1; i < temp.length; i++) {
			beforeFilter[i] = temp[i].style.display;	
			afterTicketTypeFilter[i] = temp[i].style.display;		
	}

}

function showEvent(id){
	
	$.ajax({
		type : 'POST',
		url : rootURL3,
		contentType : 'application/json',
		dataType : "json",
		data :  JSON.stringify({
			"id" : id,
		}),
		success : function(result){
			if(result!=null){
				
				$.ajax({
					type : 'POST',
					url : rootURL4,
					contentType : 'application/json',
					dataType : "json",
					data :  JSON.stringify(result),
					success :function(){
						window.location.href = "http://localhost:8081/PocetniREST/html/customerEvent.html";
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
var id;

$(document).ready(function(){

    ///////////////LOGOUT/////////////////////////////

    $('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/customerAccount.html";
	})
	
	var modal;
	
	$("#ticketsTable").on('click', '.deleteTableRowBtn', function (){
        id = $(this).attr('id');
		modal = document.getElementById('id02');
	})

    $('#signalLogout').click(function(e){
		modal = document.getElementById('id01');
	})

    window.onclick = function(event) {
		if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    /////////////////////CANCEL RESERVATION//////////////////////////////////////

    $('#cancelReservationBtn').click(function(e){
		$.ajax({
			type: 'POST',
			url: rootURL5, 
			contentType: 'application/json',
			dataType : "json",
			data : JSON.stringify({
				"id" : id,
			}),
			success : function(){
                window.location.href = "http://localhost:8081/PocetniREST/html/customerTickets.html";
            },
			error : function(XMLHttpRequest, textStatus, errorThrown){
				alert("AJAX ERROR: "+errorThrown);
			}				
		});
	})

	
	///////////////////////////////////////////////////////SEARCH//////////////////////////////////////////////////////////////////////////////
	
	var added = false;

	$('#searchBtn').click(function(e){
		var title = $('input[name=title]').val().toLowerCase();
		var fromDate = $('input[name="fromdate"]').val().toLowerCase();
		var toDate = $('input[name=todate]').val().toLowerCase();
		var minPrice = Number($('input[name=minPrice]').val().toLowerCase());
		var maxPrice = Number($('input[name=maxPrice]').val().toLowerCase());

		var table, tr, td, i, txtValue;
		table = document.getElementById("ticketsTable");
		tr = table.getElementsByTagName("tr");

		if(title!="" || fromDate!="" || toDate!="" || minPrice!=0 || maxPrice!=0  ){
			added = false;
			for (i = 1; i < tr.length; i++) {
				tr[i].style.display = "none";
			}		

			if(title!="") {
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[1];
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toLowerCase().indexOf(title) > -1) {
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";		
							}
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			if(fromDate != "" && !(title!="" && !added)){
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[2];
					if (td) {
						txtValue = td.innerText;						 
						if(tr[i].style.display == "" && Date.parse(txtValue) < Date.parse(fromDate)){
							tr[i].style.display = "none";
						}
						else if(!added && Date.parse(txtValue) >= Date.parse(fromDate)){
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";		
							}
							addedNow = true;
						}
					}
				}
				added = addedNow;
			}
			if(toDate != "" && !((title!="" || fromDate!="") && !added)){
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[2];
					if (td) {
						txtValue = td.innerText;
						if(tr[i].style.display == "" && Date.parse(txtValue) > Date.parse(toDate)){
							tr[i].style.display = "none";
						}
						else if (!added && Date.parse(txtValue) <= Date.parse(toDate)) {
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";		
							}
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			if(minPrice != 0 && !((title!="" || fromDate!="" || toDate!="") && !added)){
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[3];
					if (td) {
						txtValue = Number(td.innerText.toLowerCase()) ;
						if(tr[i].style.display == "" && txtValue < minPrice){
							tr[i].style.display = "none";
						}
						else if (!added && txtValue >= minPrice) {
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";		
							}
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			if(maxPrice != 0 && !((title!="" || fromDate!="" || toDate!="" || minPrice!=0) && !added)){
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[3];
					if (td) {
						txtValue = Number(td.innerText.toLowerCase()) ;
						if(tr[i].style.display == "" && txtValue > maxPrice){
							tr[i].style.display = "none";
						}
						else if (!added && txtValue <= maxPrice) {
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";		
							}
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			
		}
		else if(title=="" && fromDate=="" && toDate=="" && minPrice=="" && maxPrice==""  ){
			added = false;
			for (i = 1; i < tr.length; i++) {
				tr[i].style.display = "";
			}
		}
		var temp = document.getElementById("ticketsTable").getElementsByTagName("tr");
		for (i = 1; i < temp.length; i++) {
				beforeFilter[i] = temp[i].style.display;
				afterTicketTypeFilter[i] = temp[i].style.display;
		}

		filterTicketTypes();
		var sel = document.getElementById("mySelect");
		sortBy(sel.selectedIndex);
		
	});
	
	
	////////////////////////////////////////////////SORT////////////////////////////////////////
	$('#mySelect').on('change', function() {
		var e = document.getElementById("mySelect");
		sortBy(e.selectedIndex);		  
	});

	///////////////////////////////////////FILTER EVENT TYPES////////////////////////////////////////////////////////
	$('#ticketTypes').on('change', function() {
		filterTicketTypes();
	});

	////////////////////////////////////FILTER ONLY TICKETS LEFT///////////////////////////////////////////////////////////
	$('#reservedTickets').click(function() {
		filterTicketsReserved();
	});
})

function sortBy(index){
	var indexSelected = index;
	var table, rows, switching, i, x, y, tr, shouldSwitch, dir, n = 0;
	if(indexSelected%2 == 0){
		dir = "asc";
	}	
	else{
		dir = "desc";
	}	
	if(indexSelected == 0 || indexSelected == 1){//name
		n = 1;
	}else if(indexSelected == 2 || indexSelected == 3){//date
		n = 2;
	}else if(indexSelected == 4 || indexSelected == 5){//price
		n = 3;
	}

	table = document.getElementById("ticketsTable");
	tr = table.getElementsByTagName("tr");
	var backup = [];
	for(var i = 1; i < (tr.length-1); i++){
		backup[i] = [tr[i].getElementsByTagName("td")[1], tr[i].style.display];
	}
		
	switching = true;
	while (switching) {
		switching = false;
		//rows = table.rows;
		rows = table.getElementsByTagName("tr");
		for (i = 1; i < (rows.length-1); i++) {
		shouldSwitch = false;		
		x = rows[i].getElementsByTagName("TD")[n];
		y = rows[i + 1].getElementsByTagName("TD")[n];
		var xval = (n==3) ? Number(x.innerText.toLowerCase()) : x.innerText.toLowerCase();
		var yval = (n==3) ? Number(y.innerText.toLowerCase()) : y.innerText.toLowerCase();
		if (dir == "asc") {				
			if (xval > yval) {
				shouldSwitch = true;
				break;
			}				
		} else if (dir == "desc") {
			if (xval < yval) {
			shouldSwitch = true;
			break;
			}
		}
		}
		if (shouldSwitch) {
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		} 
	}
	for(var i = 1; i < (tr.length); i++){
		for (var j = 1; j < backup.length; j++) {
			if (backup[j][0] == tr[i].getElementsByTagName("td")[1]) {
				tr[i].style.display = backup[j][1];
				break;
			}
		}
	}

	var temp = document.getElementById("ticketsTable").getElementsByTagName("tr");
	for (i = 1; i < temp.length; i++) {
			beforeFilter[i] = temp[i].style.display;
			afterTicketTypeFilter[i] = temp[i].style.display;
	}

	filterTicketTypes();
}

function filterTicketTypes(){
	var e = document.getElementById("ticketTypes");
	var input, filter, table, tr, td, i, txtValue;
	if(e.options.length > 0){
		input = e.options[e.selectedIndex].text;
		filter = input.toUpperCase();
		table = document.getElementById("ticketsTable");
		tr = table.getElementsByTagName("tr");

		if(input == "All types"){
			if(beforeFilter.length > 0){
				for (i = 1; i < beforeFilter.length; i++) {
					if(  beforeFilter[i] == "" ){
						afterTicketTypeFilter[i] = "";
						td = tr[i].getElementsByTagName("td")[5];
						txtValue = td.innerText;							
						if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
							tr[i].style.display = "";
						}else if(!onlyReservedTickets){
							tr[i].style.display = "";
						}
					}
				}
			}
			else{
				for (i = 1; i < tr.length; i++) {
					afterTicketTypeFilter[i] = "";
					td = tr[i].getElementsByTagName("td")[5];
					txtValue = td.innerText;							
					if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
						tr[i].style.display = "";
					}else if(!onlyReservedTickets){
						tr[i].style.display = "";
					}		
				}
			}			
		}

		// Loop through all table rows, and hide those who don't match the search query
		else{
			if(beforeFilter.length > 0){
				for (i = 1; i < (beforeFilter.length); i++) {
					td = tr[i].getElementsByTagName("td")[4];
					if (td) {
						txtValue = td.innerText;
						if (beforeFilter[i] == "" && txtValue.toUpperCase().indexOf(filter) > -1) {
							afterTicketTypeFilter[i] = "";
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;							
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";
							}	
						} else {
							tr[i].style.display = "none";
							afterTicketTypeFilter[i] = "none";
						}
					}
				}
			}else{
				for (i = 1; i < (tr.length); i++) {
					td = tr[i].getElementsByTagName("td")[4];
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toUpperCase().indexOf(filter) > -1) {
							afterTicketTypeFilter[i] = "";
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;							
							if(onlyReservedTickets && txtValue.toLowerCase().indexOf("reserved") > -1){
								tr[i].style.display = "";
							}else if(!onlyReservedTickets){
								tr[i].style.display = "";
							}
						} else {
							tr[i].style.display = "none";
							afterTicketTypeFilter[i] = "none";
						}
					}
				}
			}
			
		}
	}
}

function filterTicketsReserved(){
	var table, tr, td, i, txtValue;
	table = document.getElementById("ticketsTable");
	tr = table.getElementsByTagName("tr");
	if($('#reservedTickets').prop('checked')) {
		onlyReservedTickets = true;
		if(afterTicketTypeFilter.length > 0){
			for (i = 1; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[5];
				if (td) {
					txtValue = td.innerText;
					if (afterTicketTypeFilter[i] == "" && txtValue.toLowerCase().indexOf("reserved") > -1) {
						tr[i].style.display = "";
					} else if(afterTicketTypeFilter[i] == "" && txtValue.toLowerCase().indexOf("reserved") <= -1){
						tr[i].style.display = "none";
					}
				}
			}
		}
		
	} else {
		onlyReservedTickets = false;
		if(afterTicketTypeFilter.length > 0){
			for (i = 1; i < afterTicketTypeFilter.length; i++) {
				if(  afterTicketTypeFilter[i] == ""){
					tr[i].style.display = "";
				}
			}
		}else{
			for (i = 1; i < tr.length; i++) {
					tr[i].style.display = "";
				
			}
		}
	}
}