
var rootURL2 = "../rest/salesmen/myConsumersAll";

var beforeFilter = [];
var afterTypeFilter = [];

findAll();

function findAll() {
	console.log('find consumers');
	$.ajax({
		type : 'GET',
		url : rootURL2,
		dataType : "json",
		success : renderResult
	});
}

function renderResult(data){
    var list = data == null ? [] : (data instanceof Array ? data : [ data ]);
	var count = 0;

    $.each(list, function(index, customer) {
        var tr = $('<tr class="customer-list" ></tr>');		
		count++;		

		if(!customer.izbrisan){

			tr.append('<td class="notsus title ac va-c word-break" >' + customer.ime + '</td>');

			tr.append('<td class="notsus title ac va-c word-break" >'  + customer.prezime + '</td>');

			tr.append('<td class="notsus title ac va-c word-break" >'  + customer.korisnickoIme + '</td>');

			tr.append('<td class="notsus title ac va-c word-break" >'  + customer.tip.tipKupca + '</td>');

			tr.append('<td class="notsus title ac va-c word-break" >'  + Number(customer.sakupljeniBodovi).toFixed(0)+ '</td>');

			
			$('#customersTable').append(tr);
		}
		if(count == list.length){
			$('div.content select.right option[value="0"]').attr("selected",true);
			var sel = document.getElementById("mySelect");
			sortBy(sel.selectedIndex);
		}
    })
    
    $('div.content select.right option[value="0"]').attr("selected",true);
	var sel = document.getElementById("mySelect");
	sortBy(sel.selectedIndex);

	var temp = document.getElementById("customersTable").getElementsByTagName("tr");
	for (i = 1; i < temp.length; i++) {
			beforeFilter[i] = temp[i].style.display;	
			afterTypeFilter[i] = temp[i].style.display;		
	}
	
}

$(document).ready(function(){

	var modal;

	$('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/salesmanAccount.html";
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


	///////////////////////////////////////////////////////SEARCH//////////////////////////////////////////////////////////////////////////////
	
	var added = false;

	$('#searchBtn').click(function(e){
		var firstname = $('input[name=firstname]').val().toLowerCase();
		var surname = $('input[name="surname"]').val().toLowerCase();
		var username = $('input[name=username]').val().toLowerCase();

		var table, tr, td, i, txtValue;
		table = document.getElementById("customersTable");
		tr = table.getElementsByTagName("tr");

		if(firstname!="" || surname!="" || username!=""){
			added = false;
			for (i = 1; i < tr.length; i++) {
				tr[i].style.display = "none";
			}		

			if(firstname!="") {
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[0];
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toLowerCase().indexOf(firstname) > -1) {
							tr[i].style.display = "";
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}
			if(surname != "" ){
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[1];
					if (td) {
						txtValue = td.innerText;						 
						if(tr[i].style.display == "" && txtValue.toLowerCase().indexOf(surname) <= -1){
							tr[i].style.display = "none";
						}
						else if(firstname=="" && !added && txtValue.toLowerCase().indexOf(surname) > -1){
							tr[i].style.display = "";
							addedNow = true;
						}
					}
				}
				added = addedNow;
			}
			if(username != ""){
				var addedNow = false;
				for (i = 1; i < tr.length; i++) {
					td = tr[i].getElementsByTagName("td")[2];
					if (td) {
						txtValue = td.innerText;
						if(tr[i].style.display == "" && txtValue.toLowerCase().indexOf(username) <= -1){
							tr[i].style.display = "none";
						}
						else if (firstname=="" && surname=="" && !added && txtValue.toLowerCase().indexOf(username) > -1) {
							tr[i].style.display = "";
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}

			/*if(firstname!="" && surname!="" && username != ""){
				var addedNow = false;
				var td0, td1, txtVal0, txtVal1;
				for (i = 1; i < tr.length; i++) {
					td0 = tr[i].getElementsByTagName("td")[0];
					td1 = tr[i].getElementsByTagName("td")[1];
					td = tr[i].getElementsByTagName("td")[2];
					if (td) {
						txtVal0 = td0.innerText;
						txtVal1 = td1.innerText;
						txtValue = td.innerText;
						if(txtVal0.toLowerCase().indexOf(firstname) <= -1 || txtVal1.toLowerCase().indexOf(surname) <= -1 || txtValue.toLowerCase().indexOf(username) <= -1){
							tr[i].style.display = "none";
						}
						else if (txtVal0.toLowerCase().indexOf(firstname) > -1 && txtVal1.toLowerCase().indexOf(surname) > -1 && txtValue.toLowerCase().indexOf(username) > -1) {
							tr[i].style.display = "";
							addedNow = true;
						} 
					}
				}
				added = addedNow;
			}*/
			
			
		}
		else if(username=="" && firstname=="" && surname==""){
			added = false;
			for (i = 1; i < tr.length; i++) {
				tr[i].style.display = "";
			}
		}
		var temp = document.getElementById("customersTable").getElementsByTagName("tr");
		for (i = 1; i < temp.length; i++) {
				beforeFilter[i] = temp[i].style.display;
				afterTypeFilter[i] = temp[i].style.display;
		}

		filterTypes();
		var sel = document.getElementById("mySelect");
		sortBy(sel.selectedIndex);
		
	});
	
	
	////////////////////////////////////////////////SORT////////////////////////////////////////
	$('#mySelect').on('change', function() {
		var e = document.getElementById("mySelect");
		sortBy(e.selectedIndex);		  
	});

	///////////////////////////////////////FILTER TYPES////////////////////////////////////////////////////////
	$('#customerTypes').on('change', function() {
		filterTypes();
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
		n = 0;
	}else if(indexSelected == 2 || indexSelected == 3){//surname
		n = 1;
	}else if(indexSelected == 4 || indexSelected == 5){//username
		n = 2;
	}else if(indexSelected == 6 || indexSelected == 7){//points
		n = 4;
	}

	table = document.getElementById("customersTable");
	tr = table.getElementsByTagName("tr");
	var backup = [{}];
	var backupAfter = [];
	var backupBefore = [];
	for(var i = 1; i < (tr.length-1); i++){
		var h = tr[i].getElementsByTagName("TD")[2].innerText.toLowerCase();
		backup[i] = {name : h, disp: tr[i].style.display};
		if(afterTypeFilter.length > 0){
			backupAfter[i] = (afterTypeFilter[i] == "") ? "" : "none";
			backupBefore[i] = (beforeFilter[i] == "") ? "" : "none";
		}
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
		var xval = (n==4) ? Number(x.innerText.toLowerCase()) : x.innerText.toLowerCase();
		var yval = (n==4) ? Number(y.innerText.toLowerCase()) : y.innerText.toLowerCase();
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
			if (backup[j].name == tr[i].getElementsByTagName("td")[2].innerText.toLowerCase()) {
				tr[i].style.display = backup[j].disp;
				if(afterTypeFilter.length > 0){
					afterTypeFilter[i] = backupAfter[j];
					beforeFilter[i] = backupBefore[j];
				}
				break;
			}
		}
	}

}

function filterTypes(){
	var e = document.getElementById("customerTypes");
	var input, filter, table, tr, td, i, txtValue;
	if(e.options.length > 0){
		input = e.options[e.selectedIndex].text;
		filter = input.toUpperCase();
		table = document.getElementById("customersTable");
		tr = table.getElementsByTagName("tr");

		if(input == "All types"){
			if(beforeFilter.length > 0){
				for (i = 1; i < beforeFilter.length; i++) {
					if(  beforeFilter[i] == "" ){
						afterTypeFilter[i] = "";
						tr[i].style.display = "";						
					}else if(beforeFilter[i] == "none"){
						tr[i].style.display = "none";	
						afterTypeFilter[i] = "none";
					}
				}
			}
			else{
				for (i = 1; i < tr.length; i++) {
					afterTypeFilter[i] = "";					
					tr[i].style.display = "";						
				}
			}			
		}

		// Loop through all table rows, and hide those who don't match the search query
		else{
			if(beforeFilter.length > 0){
				for (i = 1; i < (beforeFilter.length); i++) {
					td = tr[i].getElementsByTagName("td")[3];
					if (td) {
						txtValue = td.innerText;
						if (beforeFilter[i] == "" && txtValue.toUpperCase().indexOf(filter) > -1) {
							afterTypeFilter[i] = "";		
							tr[i].style.display = "";
							
						} else {
							tr[i].style.display = "none";
							afterTypeFilter[i] = "none";
						}
					}
				}
			}else{
				for (i = 1; i < (tr.length); i++) {
					td = tr[i].getElementsByTagName("td")[3];
					if (td) {
						txtValue = td.innerText;
						if (txtValue.toUpperCase().indexOf(filter) > -1) {
							afterTypeFilter[i] = "";						
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

