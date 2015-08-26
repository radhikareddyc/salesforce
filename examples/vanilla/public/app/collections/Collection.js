window.collections = window.collections || {};
window.collections.Collection = (function() {

	function Collection(Model, url) {

		this.data = [];
		this.Model = Model;
		this.url = url;

	}

	Collection.prototype.create = function(data) {

		var record = new this.Model(data);

		this.data.push(record);

		return record;

	};

	Collection.prototype.createAll = function(all) {

		if (all.length > 0) {

			all.forEach(this.create.bind(this));

		}

		return this.data;

	};

	Collection.prototype.count = function() {

		return this.data.length;

	};

	Collection.prototype.remove = function(todo) {

		this.data = this.data.filter(function(item) {

			return item !== todo;

		});

	};
	Collection.prototype.each = function(cb) {

		this.data.forEach(cb);

	};

	Collection.prototype.fetch = function() {

		// returning a promise-like object, so others can chain
		return $.ajax({
			type: 'GET',
			url: this.url,
			dataType: 'json'
		}).then(this.createAll.bind(this));

	};

	return Collection;

}());