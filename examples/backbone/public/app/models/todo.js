define(['backbone'], function(Backbone) {

	return Backbone.Model.extend({

		defaults: {
			title: null,
			done: false
		},

		toggle: function() {

			this.save({
				done: !this.get('done')
			});

		}

	});

});