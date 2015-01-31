var ContactApp = ContactApp || { Models: {}, Collections: {}, Views: {} };

// Category Model

ContactApp.Models.Category = Backbone.Model.extend({
		initialize: function(){
			console.log('category created yo');
		}
		
	});

// Category Collection

ContactApp.Collections.CategoryCollection = Backbone.Collection.extend({
		url: '/categories',
		model: ContactApp.Models.Category
	});