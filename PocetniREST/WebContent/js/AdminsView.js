
var rootURL2 = "../rest/admins/getAdmins";
var beforeFilter = [];
var afterTypeFilter = [];

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
		if(!event.izbrisan){
                console.log(event)
                var tr = null;
                tr = $('<tr class="customer-list"></tr>');
                tr.append('<td class="notsus title ac va-c word-break" >' + event.ime + '</td>' +
                            '<td class="notsus title ac va-c word-break">' + event.prezime+ '</td>' +
                            '<td class="notsus title ac va-c word-break">' + event.korisnickoIme + '</td>');
                
                $('#customersTable').append(tr);
		}
        
	});
	
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

		var sel = document.getElementById("mySelect");
		sortBy(sel.selectedIndex);
		
	});
	
	
	////////////////////////////////////////////////SORT////////////////////////////////////////
	$('#mySelect').on('change', function() {
		var e = document.getElementById("mySelect");
		sortBy(e.selectedIndex);		  
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
		var xval = x.innerText.toLowerCase();
		var yval = y.innerText.toLowerCase();
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
