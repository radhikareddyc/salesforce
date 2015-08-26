define(['backbone'], function(Backbone) {

	return Backbone.View.extend({

		tagName: 'li',
		template: _.template([
			'<div class="view">',
				'<input class="toggle" type="checkbox" <%= done ? \'checked\' : \'\' %> />',
				'<label><%- title %></label>',
				'<a class="destroy"></a>',
			'</div>',
			'<input class="edit" type="text" value="<%- title %>"/>'
		].join('')),
		events: {
			'click .toggle': 'toggleDone',
			'dblclick .view': 'edit',
			'click a.destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},

		initialize: function() {

			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);

		},

		render: function() {

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('done', this.model.get('done'));

			return this;

		},

		toggleDone: function() {

			this.model.toggle();

		},

		edit: function() {

			this.$el.addClass('editing');
			this.$('.edit').focus();

		},

		close: function() {

			var value = this.$('.edit').val();

			if (!value) {

				this.clear();

			} else {

				this.model.save({title: value});
				this.$el.removeClass('editing');

			}

		},

		updateOnEnter: function(e) {

			if (e.keyCode == 13) {

				this.close();

			}

		},

		clear: function() {

			this.model.destroy();

		}

	});

});