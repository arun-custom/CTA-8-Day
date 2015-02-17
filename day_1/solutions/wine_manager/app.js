var endpointBase = "http://daretodiscover.herokuapp.com/wines/";

function Wine(wineData) {
	if (wineData) {
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

	return this;
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
			done();
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
			done();
		},
		error: function() {
			alert("There was a problem adding the wine");
		}
	});
}

Wine.prototype.findAll = function() {
	$.ajax({
		type: "GET",
		url: endpointBase,
		success: function(data) {
			console.log(data);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}

Wine.prototype.find = function() {
	$.ajax({
		type: "GET",
		url: endpointBase + this.id,
		success: function(data) {
			console.log(data);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}

Wine.prototype.delete = function() {
	$.ajax({
		type: "DELETE",
		url: endpointBase + this.id,
		success: function(data) {
			console.log(data);
		},
		error: function() {
			alert("Something went wrong...");
		}
	});
}

$(document).on("click", "#save-wine", function() {
	var newWine = new Wine({
		id: null,
		name: "Arun's New Wine",
		year: 2015,
		grapes: "Arun's Grapes",
		country: "USA",
		region: "California",
		price: 25,
		description: "This is some good wine!",
		picture: "http://www.hinsdalecellars.com/images/Assorted%20Wines%202.jpg"
	});
	newWine.save();
});

$(document).on("click", "#get-wines", function() {
	var allWines = new Wine();
	allWines.findAll();
});

$(document).on("click", "#get-wine", function() {
	var newWine = new Wine({
		id: 1
	});
	newWine.find();
});

$(document).on("click", "#update-wine", function() {
	var newWine = new Wine({
		id: 1,
		name: "Arun Changed It",
		year: 2015,
		grapes: "Arun's Grapes",
		country: "USA",
		region: "California",
		price: 25,
		description: "This is some good wine!",
		picture: "http://www.hinsdalecellars.com/images/Assorted%20Wines%202.jpg"
	});
	newWine.update();
});

$(document).on("click", "#delete-wine", function() {
	var newWine = new Wine({
		id: 1
	});
	newWine.delete();
});