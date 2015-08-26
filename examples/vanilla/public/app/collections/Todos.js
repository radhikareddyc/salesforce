window.collections = window.collections || {};
window.collections.Todos = (function(Collection, Todo) {

	function TodosCollection() {

		Collection.call(this, Todo, '/todos');

	}

	TodosCollection.prototype = Object.create(Collection.prototype);
	TodosCollection.prototype.constructor = TodosCollection;

	return TodosCollection;

}(collections.Collection, models.Todo));