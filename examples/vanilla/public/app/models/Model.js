window.models = window.models || {};
window.models.Model = (function() {

	function Model(data, url) {

		this.data = data || {};
		this.url = url;

	}

	Model.prototype.get = function(key) {

		return this.data[key];

	};

	Model.prototype.set = function(key, value) {

		this.data[key] = value;

	};

	Model.prototype.save = function(data) {

		var id = this.get('id');

		if (data) {

			this.data = $.extend(this.data, data);

		}

		if (id) {

			// this is an update
			return $.ajax({
				type: 'PUT',
				url: this.url + '/' + id,
				data: this.data,
				dataType: 'json'
			});

		} else {

			// this is a create
			return $.ajax({
				type: 'POST',
				url: this.url,
				data: this.data,
				dataType: 'json'
			});

		}

	};

	Model.prototype.destroy = function() {

		var id = this.get('id');

		if (id) {

			return $.ajax({
				type: 'DELETE',
				url: this.url + '/' + id
			});

		}

	};

	return Model;

}());