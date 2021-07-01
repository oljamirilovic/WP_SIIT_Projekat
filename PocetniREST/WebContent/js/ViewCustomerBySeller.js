
var rootURL2 = "../rest/salesmen/myConsumersAll";


findAll();

function findAll() {
	console.log('find consumers');
	$.ajax({
		type : 'GET',
		url : rootURL2,
		dataType : "json",
		success : renderList
	});
}

function renderList(data){
	var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	
	$.each(list, function(index, event) {
                console.log(event)
                var tr = null;
                tr = $('<tr></tr>');
                tr.append('<td>' + event.ime + '</td>' +
                            '<td>' + event.prezime+ '</td>' +
                            '<td>' + event.korisnickoIme + '</td>' +
                             '<td>' + event.datumRodjenja+ '</td>'+
                        '<td>' + event.tip.tipKupca+ '</td>' 
                        +'<td>' + event.karte.length + '</td>' );
                        
                    $('#ConsumesTable').append(tr);
        
	});
		
}

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


	var added = false;

	$('#searchBtn').click(function(e){
		var name = $('input[name=name]').val().toLowerCase();
		var lastname = $('input[name=lastName]').val().toLowerCase();
		var username = $('input[name=username]').val().toLowerCase();
		
	
		var table, tr, td, i, txtValue;
		table = document.getElementById("ConsumesTable");
		tr = table.getElementsByTagName("tr");
	
		if(name!="" || lastname!="" || username!=""  ){
			added = false;
			for (i = 1; i < tr.length; i++) {
				tr[i].style.display = "none";
			}		
	
			if(name!="") {
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[0];
					console.log(td)
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toLowerCase().indexOf(name) > -1) {
							td = tr[i].getElementsByTagName("td")[2];
							txtValue = td.innerText;
							
								tr[i].style.display = "";		
							
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			if(lastname!="") {
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[1];
					console.log(td)
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toLowerCase().indexOf(lastname) > -1) {
							td = tr[i].getElementsByTagName("td")[2];
							txtValue = td.innerText;
							
								tr[i].style.display = "";		
							
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			if(username!="") {
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[2];
					console.log(td)
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toLowerCase().indexOf(username) > -1) {
							td = tr[i].getElementsByTagName("td")[2];
							txtValue = td.innerText;
							
								tr[i].style.display = "";		
							
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			
			
		}
		else if(name=="" && lastname=="" && username=="" ){
			added = false;
			for (i = 1; i < tr.length; i++) {
				tr[i].style.display = "";
			}
		}
		var temp = document.getElementById("ConsumesTable").getElementsByTagName("tr");
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
	
	table = document.getElementById("ConsumesTable");
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
	
	var temp = document.getElementById("ConsumesTable").getElementsByTagName("tr");
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
		table = document.getElementById("ConsumesTable");
		tr = table.getElementsByTagName("tr");
	
		if(input == "All types"){
			if(beforeFilter.length > 0){
				for (i = 1; i < beforeFilter.length; i++) {
					if(  beforeFilter[i] == "" ){
						afterTicketTypeFilter[i] = "";
						td = tr[i].getElementsByTagName("td")[3];
						txtValue = td.innerText;							
						
							tr[i].style.display = "";
						
					}
				}
			}
			else{
				for (i = 1; i < tr.length; i++) {
					afterTicketTypeFilter[i] = "";
					td = tr[i].getElementsByTagName("td")[3];
					txtValue = td.innerText;							
					
						tr[i].style.display = "";
						
				}
			}			
		}
	
		// Loop through all table rows, and hide those who don't match the search query
		else{
			if(beforeFilter.length > 0){
				for (i = 1; i < (beforeFilter.length); i++) {
					td = tr[i].getElementsByTagName("td")[4];
					console.log(td)
					console.log("ovo iznad brise")
					if (td) {
						txtValue = td.innerText;
						if (beforeFilter[i] == "" && txtValue.toUpperCase().indexOf(filter) > -1) {
							afterTicketTypeFilter[i] = "";
							td = tr[i].getElementsByTagName("td")[5];
							txtValue = td.innerText;							
							
								tr[i].style.display = "";
							
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
							
								tr[i].style.display = "";
							
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
	/*
	function filterTicketsReserved(){
	var table, tr, td, i, txtValue;
	table = document.getElementById("ConsumesTable");
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
	
	}*/
	
	
	
	