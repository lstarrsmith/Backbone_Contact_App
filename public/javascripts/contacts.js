var ContactApp = ContactApp || { Models: {}, Collections: {}, Views: {} };

// Contact Model


ContactApp.Models.Contact = Backbone.Model.extend({
	initialize: function() {
		console.log("contact created yo")
	},

	defaults: {
		hidden: false
	}
	
});


// Contact Collection

ContactApp.Collections.ContactCollection = Backbone.Collection.extend({
	url: '/contacts',
	model: ContactApp.Models.Contact
});


// Contact View

ContactApp.Views.ContactView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'all', this.render)
	},
	tagName: 'li',
	template: _.template( $('#contact-template').html() ),
	events: {
		'click a': 'editContact',
				
	},
	render: function(){
		this.$el.empty();
		this.$el.html(this.template (this.model.attributes ));
		
		return this
	},

	editContact: function() {
	
		var modalView = new ContactApp.Views.ModalView({ model: this.model})
	},
});

// Contact List View

ContactApp.Views.ContactListView = Backbone.View.extend({
	initialize: function(option){
		this.filter = option.filter
		
		this.listenTo(this.collection, 'add', this.render);
		this.listenTo(this.collection, 'destroy', this.render);
		this.listenTo(this.collection, 'change:category_id', this.render);

		this.collection.fetch();
		

	},

	render: function(contact) {
		var self = this;
		
		this.$el.empty();

		this.collection.where({category_id: this.filter}).forEach(function(contact) {
			var contactView = new ContactApp.Views.ContactView({ model: contact});
			var contactViewHTML = contactView.render().el
			self.$el.append( contactViewHTML);
		});
	}
	
	
});

// Edit Popout View

ContactApp.Views.ModalView = Backbone.View.extend({
	initialize: function () {
		this.render();
	},

	modalTemplate: _.template( $('#modal-template').html() ),

	events: {
		'click button[name=edit-contact]': 'edit',
		'click button[name=delete-contact]': 'delete',
		'click button[name=close-contact]': 'close',
		'click button[name=save-contact]': 'save',
		'click button[name=cancel-contact]': 'cancel',
	},

	delete: function (){
		this.model.destroy();
		$('#modal-contact').modal('toggle');
	},

	edit: function (){
		// gather current values
		var name = this.model.attributes.name;
		var age = this.model.attributes.age;
		var address = this.model.attributes.address;
		var phone_number = this.model.attributes.phone_number;

		// **** change this to a template

		$('.modal-title').html('<input type="text" name="contact-name" value="' + name + '">')
		$('.age').html('<input type="text" name="contact-age" value="' + age + '">');
		$('.address').html('<input type="text" name="contact-address" value="' + address + '">');
		$('.number').html('<input type="text" name="contact-number" value="' + phone_number + '">');
		$('.category_id').html('<select class="input" name="contact-category"><option value="Friends">Friends</option><option value="Coworkers">Coworkers</option><option value="Family">Family</option></select>')
		

		$('.modal-footer').html('<button type="button" name="save-contact">Save</button><button type="button" name="cancel-contact">Cancel</button>');
	},

	save: function (){
		var name = this.$el.find('input[name="contact-name"]').val();
		var age = this.$el.find('input[name="contact-age"]').val();
		var address = this.$el.find('input[name="contact-address"]').val();
		var number = this.$el.find('input[name="contact-number"]').val();
		var categoryName = this.$el.find('select[name="contact-category"]').val().toLowerCase();

			if (categoryName === "coworkers") {
					this.model.set({ name: name, age: age, address: address, phone_number: number, category_id: 2})
				} else if (categoryName === "friends") {
					this.model.set({ name: name, age: age, address: address, phone_number: number, category_id: 1})
				} else if (categoryName === "family") {
					this.model.set({ name: name, age: age, address: address, phone_number: number, category_id: 3})
				}

		this.model.save();
	
		$('#modal-contact').modal('toggle');
	},

	close: function (){
		$('#modal-contact').modal('toggle');
	},

	cancel: function (){
		$('#modal-contact').modal('toggle');
	},	


	render: function() {
		
		var myTemplate = this.modalTemplate( { contact: this.model.toJSON() } );
		this.$el.html(myTemplate);
		$('#modal-content').empty();
		$('#modal-content').append(this.$el);
	}
});


