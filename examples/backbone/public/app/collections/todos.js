define(['backbone', 'models/todo'], function(Backbone, TodoModel) {

	return Backbone.Collection.extend({

		model: TodoModel,

		url: '/todos',

		done: function() {

			return this.filter(function(todo) {

				return todo.get('done');

			});

		},

		remaining: function() {

			return this.without.apply(this, this.done());

		}

	});

});