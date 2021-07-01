//odobravanje i neodobravanje


var rootURL1 = "../PocetniREST/rest/comments/delete";
var rootURL2 = "../PocetniREST/rest/comments/add";
var rootURL3 = "../PocetniREST/rest/comments/approve";

//TODO povezati sa htmlom
$(document).ready(function(){


$('#del').click(function(e){
    e.preventDefault();
    var d= $("input[name=id]").val(); //ovo treba preko forme

    $.ajax({
        type : 'DELETE',
        url : rootURL1, 
        contentType : 'application/json',
        dataType : "json",
        data :  JSON.stringify({
            "id" : id,
        }),
        success:function(result){
            console.log(result);
            //TODO prozorce, i da ode na drugu stranicu
            window.location.href = "http://localhost:8081/PocetniREST/ComentsView.html"; //TODO: predji na oljinu str??
            },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("AJAX ERROR: " + errorThrown);
        }

});})


$('#approve').click(function(e){
    e.preventDefault();
    var d= $("input[name=id]").val(); //ovo treba preko forme

    $.ajax({
        type : 'POST', //todo proveri ovo
        url : rootURL3, 
        contentType : 'application/json',
        dataType : "json",
        data :  JSON.stringify({
            "id" : id,
        }),
        success:function(result){
            console.log(result);
            //TODO prozorce, i da ode na drugu stranicu
            window.location.href = "http://localhost:8081/PocetniREST/ComentsView.html"; //TODO: predji na oljinu str??
            },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("AJAX ERROR: " + errorThrown);
        }

});})

})



