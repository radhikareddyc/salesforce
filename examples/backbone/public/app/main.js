require.config({
	paths: {
		underscore: 'libs/underscore/underscore-min',
		jquery: 'libs/jquery/dist/jquery.min',
		backbone: 'libs/backbone/backbone-min'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	}
});

require([
	'collections/todos',
	'views/todos'
], function(TodosCollection, TodosView) {

	$(function() {

		new TodosView({
			collection: new TodosCollection()
		});

	});

});