var endpointBase = "http://daretodiscover.herokuapp.com/wines/";

function Wine(wineData) {
	if (wineData){
		this.id = wineData.id;
		this.name = wineData.name;
		this.year = wineData.year;
		this.grapes = wineData.grapes;
		this.country = wineData.country;
		this.region = wineData.region;
		this.price = wineData.price;
		this.description = wineData.description;
		this.picture = wineData.picture;
	}
}

Wine.prototype.save = function(done) {
	var wineData = {
		name: this.name,
		year: this.year,
		grapes: this.grapes,
		country: this.country,
		region: this.region,
		price: this.price,
		description: this.description,
		picture: this.picture
	};

	$.ajax({
		url: endpointBase,
		type: "POST",
		data: wineData,
		success: function(data) {
			done(data);
		},
		error: function() {
			alert("There was a problem adding the wine");
		}
	});
}

Wine.prototype.update = function(done) {
	var wineData = {
		name: this.name,
		year: this.year,
		grapes: this.grapes,
		country: this.country,
		region: this.region,
		price: this.price,
		description: this.description,
		picture: this.picture
	};

	$.ajax({
		url: endpointBase + this.id,
		type: "PUT",
		data: wineData,
		success: function(data) {
			done(data);
		},
		error: function() {
			alert("There was a problem adding the wine");
		}
	});
}

Wine.prototype.findAll = function(done) {
	$.ajax({
		type: "GET",
		url: endpointBase,
		success: function(data) {
			done(data);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}

Wine.prototype.find = function(done) {
	$.ajax({
		type: "GET",
		url: endpointBase + this.id,
		success: function(data) {
			done(data);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}

Wine.prototype.destroy = function(done) {
	$.ajax({
		type: "DELETE",
		url: endpointBase + this.id,
		success: function(data) {
			done(data);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}

function View(data, template) {
	this.data = data;
	this.template = template;
}

View.prototype.render = function() {
	var source = $(this.template).html();
	var template = Handlebars.compile(source);

	var wineData = this.data;

	if (wineData instanceof Array) {
		$("#wine-container").html("");

		wineData.forEach(function(wine) {
			var html = template(wine);
			$("#wine-container").append(html);
		});
	} else {
		var html = template(this.data);
		$("#wine-container").html(html);
	}
}

function showAllWines() {
	var allWines = new Wine();

	allWines.findAll(function(wines) {
		var wineView = new View(wines, "#wine-list-template");
		wineView.render();
	});
}

$(document).ready(function() {
	showAllWines();
});

$(document).on("click", ".edit-wine-button", function(event) {
	event.preventDefault();

	var specWine = new Wine({
		id: $(this).attr("id")
	});

	specWine.find(function(wine) {
		var wineView = new View(wine, "#edit-wine-template");
		wineView.render();
	});
});

$(document).on("click", "#cancel-edit-button", function(event) {
	event.preventDefault();

	showAllWines();
});

$(document).on("click", ".submit-edit-button", function(event) {
	event.preventDefault();

	var wineData = {
		id: $(this).attr("id"),
		name: $("#edit-name").val(),
		year: $("#edit-year").val(),
		grapes: $("#edit-grapes").val(),
		country: $("#edit-country").val(),
		region: $("#edit-region").val(),
		price: $("#edit-price").val(),
		description: $("#edit-description").val(),
		picture: $("#edit-picture").val()
	};

	var editWine = new Wine(wineData);

	editWine.update(function() {
		showAllWines();
	});
});

$(document).on("click", "#save-wine-button", function(event) {
	event.preventDefault();

	var wineData = {
		name: $("#new-name").val(),
		year: $("#new-year").val(),
		grapes: $("#new-grapes").val(),
		country: $("#new-country").val(),
		region: $("#new-region").val(),
		price: $("#new-price").val(),
		description: $("#new-description").val(),
		picture: $("#new-picture").val()
	};

	var newWine = new Wine(wineData);

	newWine.save(function() {
		$("#add-wine-modal").modal("hide");
		showAllWines();
	});
});

$(document).on("click", ".delete-wine-button", function(event) {
	event.preventDefault();

	var delWine = new Wine({
		id: $(this).attr("id")
	});

	delWine.destroy(function() {
		showAllWines();
	});
});