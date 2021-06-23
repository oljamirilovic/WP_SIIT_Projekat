

var rootURL = "../PocetniREST/rest/manifestation/";
var rootURL1 = "../PocetniREST/rest/manifestation/change";
var rootURL2 = "../PocetniREST/rest/manifestation/get";
var rootURL3 = "../PocetniREST/rest/manifestation/delete";
var rootURL4 = "../PocetniREST/rest/manifestation/add";
var rootURL5 = "../PocetniREST/rest/manifestation/approve";
//TODOO ovo povezati sa oljinim, i proveriti sta ovo radi sve  i kako
$(document).ready(function () {

	$('#add').click(function (e) { //btn na koji se klikne
		e.preventDefault();

		var d = new Date();
		var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();


		if ($("input[name=date]").val() != null
			&& $("input[name=name]").val() != null && $("input[name=type]").val() != null
			&& $("input[name=SeetsNumber]").val() != null != null && $("input[name=price]").val() != null
		) {

			let data = { //namesti nov
				"naziv": $("input[name=name]").val(),
				"tipManifestacije": $("input[name=type]").val(),
				"brojMesta": $("input[name=SeetsNumber]").val(),
				"datumVreme": $("input[name=date]").val(),
				"cena": $("input[name=price]").val(),
				"status": (false).text(),
				"lokacija": "",
				"izbrisana": (false).text(),
				"poster": ""
			};


			$.ajax({
				type: 'POST',
				url: rootURL4,
				contentType: 'application/json',
				dataType: "json",
				data: JSON.stringify(data),
				success: function (result) { //proveri da li ovde success znaci !=null
					console.log(result);
					if (result != null) {
						window.location.href = "http://localhost:8080/PocetniREST/pregled.html"; //TODO: Oljin!!!
					} else {
						$.ajax({
							type: 'POST',
							url: rootURL2,
							contentType: 'application/json',
							dataType: "json",
							success: function (result2) {
								var list1 = result2 == null ? [] : (result2 instanceof Array ? result2 : [result2]);
								$each(list, function (index, event) {
									if (data.naziv == event.naziv) {
										var d = $('<div></div>');
										d.append('<p style="font-color:#ff0000;">' + 'Name: ' + event.naziv + ' already exists' + '</p>');
										$("body").append(d);
									}
									if (data.getLokacija.getGeografskaSirina() == event.getLokacija().getGeografskaSirina() &&
										data.getLokacija.getGeografskaDuzina() == event.getLokacija().getGeografskaDuzina() &&
										data.getDatumVreme() == event.getDatumVreme()
									) {
										var d = $('<div></div>');
										d.append('<p style="font-color:#ff0000;">' + 'Location on this termin is reserved for something else.' + '</p>');
										$("body").append(d);
									}
								});
							}
						});
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert("AJAX ERROR: " + errorThrown);
				}
			});


		} else if ($("input[name=date]").val() == null
			&& $("input[name=name]").val() == null
			&& $("input[name=SeetsNumber]").val() == null && $("input[name=date]").val() == null && $("input[name=price]").val() == null
		) {
			var d = $('<div></div>');
			d.append('<p>' + 'Not valid input.' + '</p>');
			$("body").append(d);
		}
	})

	$('#del').click(function (e) {
		e.preventDefault();
		var d = $("input[name=name]").val(); //ovo treba preko forme

		$.ajax({
			type: 'DELETE',
			url: rootURL5,
			contentType: 'application/json',
			dataType: "json",
			data: JSON.stringify({
				"id": id,
			}),
			success: function (result) {
				console.log(result);
				window.location.href = "http://localhost:8080/PocetniREST/pregled.html"; //TODO: predji na oljinu str??
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX ERROR: " + errorThrown);
			}

		});
	})

	$('#approve').click(function (e) { //TODO doradi
		e.preventDefault();
		var d = $("input[name=name]").val(); //ovo treba preko forme

		$.ajax({
			type: 'PUT',
			url: rootURL5,
			contentType: 'application/json',
			dataType: "json",
			data: JSON.stringify({
				"id": id,
			}),
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				alert("AJAX ERROR: " + errorThrown);
			}

		});

	});

		$('#change').click(function (e) {
			e.preventDefault();
			var d = $("input[name=oldName]").val(); //ovo treba preko forme
			var d = $("input[name=name]").val();

			if ($("input[name=date]").val() != null
				&& $("input[name=name]").val() != null
				&& $("input[name=SeetsNumber]").val() != null && $("input[name=date]").val() != null && $("input[name=price]").val() != null
			) {

				let data = { //namesti nov
					"naziv": $("input[name=name]").val(),
					"tipManifestacije": $("input[name=type]").val(),
					"brojMesta": $("input[name=SeetsNumber]").val(),
					"datumVreme": $("input[name=date]").val(),
					"cena": $("input[name=price]").val(),
					"status": (false).text(),
					"lokacija": "",
					"izbrisana": (false).text(),
					"poster": ""
				};
				$.ajax({
					type: 'PUT',
					url: rootURL1,
					contentType: 'application/json',
					dataType: "json",
					data: JSON.stringify({
						data
					}),
					success: function (result) { //vrv dodaj i proveru za lokacije i ime!! tj
						console.log(result);
						window.location.href = "http://localhost:8080/PocetniREST/pregled.html"; //TODO: predji na oljinu str??
					},
					error: function (XMLHttpRequest, textStatus, errorThrown) {
						alert("AJAX ERROR: " + errorThrown);
					}

				});
			}
		})
	})