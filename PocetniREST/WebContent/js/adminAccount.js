var rootURL1 = "../../PocetniREST/rest/admins/getCurrentAdmin";
var rootURL2 = "../../PocetniREST/rest/admins/saveProfileChanges";
var rootURL3 = "../../PocetniREST/rest/admins/setCurrentAdmin";

findAll();

function findAll() {
    $.ajax({
        type : 'GET',
        url : rootURL1,
        dataType : "json",
        success : renderResult
    });
}

function renderResult(data){
    $('input[name=username]:text').val(data.korisnickoIme);
    $('input[name=pswrd]:text').val(data.lozinka);
    $('input[name=name]:text').val(data.ime);
    $('input[name=surname]:text').val(data.prezime);
    $('input[name=birthday]:text').val(data.datumRodjenja);
    var num = 0;
    if(data.pol.toLowerCase() == "female" ){
        num = 1;
    }
    $('form.profileContent select option[value=' + num +  ']').attr("selected",true);

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById("birthday").setAttribute("max", today);
    
}

$(document).ready(function(){

    ///////////////LOGOUT/////////////////////////////

    $('#logoutBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/unregStartUp.html";
	})
		
	$('#accountBtn').click(function(e){
		window.location.href = "http://localhost:8081/PocetniREST/html/adminAccount.html";
	})
	
	var modal;
	
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

    ///////////////SAVE CHANGES//////////////////////
	
	$('#saveProfileBtn').click(function(e){
        var psw = $("input[name=pswrd]").val();
		var name = $("input[name=name]").val();
		var surname = $("input[name=surname]").val();
		var bday = $("input[name=birthday]").val();
		var gender = $("select[name=gender]  option:selected").text();

        var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        if(psw=="" || name==""|| surname==""|| bday=="" ){
			invalidInput("All fields must be filled!","anime-detail-header-stats di-tc va-t ");			
		}
        else {
			if(Date.parse(strDate) < Date.parse(bday)){
				invalidInput("Birthday invalid!","anime-detail-header-stats di-tc va-t ");				
			}
            else{
                let data = {
                    "lozinka": psw,
                    "ime": name,
                    "prezime": surname,
                    "pol": gender,
                    "datumRodjenja": bday
                };
            
            $.ajax({
                type: 'POST',
                url: rootURL2, //"../PocetniREST/rest/admins/saveProfileChanges";
                contentType: 'application/json',
                dataType : "json",
                data : JSON.stringify(data),
                success : function(result){
                    
                    $.ajax({
                        type : 'POST',
                        url : rootURL3, //"../PocetniREST/rest/admins/setCurrentCustomer";
                        contentType : 'application/json',
                        dataType : "json",
                        data :  JSON.stringify(result),
                        success :function(){
                            
                            window.location.href = "http://localhost:8081/PocetniREST/html/adminAccount.html";
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
        }

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