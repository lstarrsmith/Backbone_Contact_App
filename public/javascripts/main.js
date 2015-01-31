var ContactApp = ContactApp || { Models: {}, Collections: {}, Views: {} };

ContactApp.initialize = function(){
	
	
	window.contacts = new ContactApp.Collections.ContactCollection();
	var categories = new ContactApp.Collections.CategoryCollection();

	contacts.fetch();
	categories.fetch();

	var friendList = new ContactApp.Views.ContactListView({ 
		collection: contacts, 
		el: $('.friends_list'), 
		filter: 1
		
	});

	var coworkersList = new ContactApp.Views.ContactListView({
		collection: contacts, 
		el: $('.coworkers_list'), 
		filter: 2
	});

	var familyList = new ContactApp.Views.ContactListView({ 
		collection: contacts, 
		el: $('.family_list'), 
		filter: 3
	});


	// Form view 

	var FormView = Backbone.View.extend({

		events: {
			"click #add-contact" : "createContact",
			"click i#random-user" : "createRandom"
		},

		createContact: function(e) {
			console.log('selected');

			e.preventDefault();

			var name = this.$el.find('input[name="contact-name"]').val();
			var age = this.$el.find('input[name="contact-age"]').val();
			var address = this.$el.find('input[name="contact-address"]').val();
			var number = this.$el.find('input[name="contact-number"]').val();
			var picture = this.$el.find('input[name="contact-picture"]').val();
			var categoryName = this.$el.find('select[name="contact-category"]').val().toLowerCase();

			
			if (categoryName === "coworkers") {
				this.collection.create({ name: name, age: age, address: address, phone_number: number, picture: picture, category_id: 2})
			} else if (categoryName === "friends") {
				this.collection.create({ name: name, age: age, address: address, phone_number: number, picture: picture, category_id: 1})
			} else if (categoryName === "family") {
				this.collection.create({ name: name, age: age, address: address, phone_number: number, picture: picture, category_id: 3})
			}
			
			e.target.reset();

		},

		createRandom: function() {
			// random user api call
				$.ajax({
			  	url: 'http://api.randomuser.me/',
			  	dataType: 'json',
			  	success: function(data){
			  		var name = capitalizeFirstLetter(data.results[0].user.name.first);
			  		$('input[name="contact-name"]').val(name);
			  		
			  		var age = Math.floor(Math.random()*(101-18)+18)
			  		$('input[name="contact-age"]').val(age);

			  		var address = data.results[0].user.location.street;
			  		$('input[name="contact-address"]').val(address);

			  		var number = data.results[0].user.cell;
			  		$('input[name="contact-number"]').val(number);

			  		var picture = data.results[0].user.picture.medium;
			  		$('input[name="contact-picture"]').val(picture);

					}
				})

			}
	});

	// Form initialize
	var formView = new FormView({ el: $(".addNew"), collection: contacts });


	// Capitalize function necessary for form name

	function capitalizeFirstLetter(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	// Search

	String.prototype.contains = function(it) { return this.indexOf(it) != -1; };


	$('.search').on('keyup', function () {
		var search_query = this.value;
			
		_.each(contacts.models, function(contact) {
			if (search_query === "") {
				contact.set({"hidden": false});
			}
			else if (contact.attributes.name.toLowerCase().contains(search_query)) {
				contact.set({"hidden": false});
			} else {
				contact.set({"hidden": true});
			}
		})
	})









}

// initialize the app

$(function(){
	ContactApp.initialize();
})