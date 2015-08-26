window.models = window.models || {};
window.models.Todo = (function(Model) {

	function TodoModel(data) {

		data = $.extend({
			id: null,
			title: null,
			done: false
		}, data || {});

		Model.call(this, data, '/todos');

	}

	TodoModel.prototype = Object.create(Model.prototype);
	TodoModel.prototype.constructor = TodoModel;

	return TodoModel;

}(models.Model));