window.views = window.views || {};
window.views.TodoItem = (function() {

	function TodoItem(model, $parentEl) {

		this.model = model;

		this.$el = $([
			'<li>',
				'<div class="view">',
					'<input class="toggle" type="checkbox" ' + (!!this.model.get('done') ? 'checked' : '') + '/>',
					'<label>' + this.model.get('title') + '</label>',
					'<a class="destroy"></a>',
				'</div>',
				'<input class="edit" type="text" value="' + this.model.get('title') + '"/>',
			'</li>'
		].join(''));
		this.$el.appendTo($parentEl);

		this.$checkbox = $('.toggle', this.$el);
		this.$input = $('.edit', this.$el);
		this.$label = $('label', this.$el);

		this.$el.on('blur', '.edit', this.onBlur.bind(this));
		this.$el.on('keypress', '.edit', this.onKeypress.bind(this));
		this.$el.on('click', '.destroy', this.onDestroy.bind(this));
		this.$el.on('dblclick', '.view', this.onEdit.bind(this));
		this.$el.on('click', '.toggle', this.onToggle.bind(this));

	}

	TodoItem.prototype.onEdit = function() {

		this.$el.addClass('editing');
		this.$input.focus();

	};

	TodoItem.prototype.onBlur = function() {

		var value = this.$input.val();

		if (!value) {

			this.onDestroy();

		} else {

			this.model.save({title: value});
			this.$label.html(value);
			this.$el.removeClass('editing');

		}

	};

	TodoItem.prototype.onKeypress = function(e) {

		if (e.keyCode == 13) {

			this.onBlur();

		}

	};

	TodoItem.prototype.onDestroy = function() {

		this.destroy();

	};

	TodoItem.prototype.onToggle = function() {

		this.toggleDone(this.$checkbox.is(':checked'));

	};

	TodoItem.prototype.toggleDone = function(done) {

		this.model.save({done: done});
		this.$el.toggleClass('done', done);

		if (done) {

			this.$checkbox.attr('checked', 'checked');

		} else {

			this.$checkbox.removeAttr('checked');

		}

	};

	TodoItem.prototype.destroy = function() {

		this.$el.remove();

		delete this.$el;

		this.model.destroy();

	};

	TodoItem.prototype.render = function() {

		this.$el.toggleClass('done', !!this.model.get('done'));

	};

	return TodoItem;

}(views.View));