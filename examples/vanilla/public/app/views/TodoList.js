window.views = window.views || {};
window.views.TodoList = (function(TodoItem) {

	function TodoList(collection, $parentEl) {

		this.collection = collection;
		this.items = [];

		this.$el = $([
			'<section id="todoapp">',
				'<header id="header">',
					'<h1>todos</h1>',
					'<input id="new-todo" placeholder="What needs to be done?" autofocus/>',
				'</header>',
				'<section id="main">',
					'<input id="toggle-all" type="checkbox">',
					'<label for="toggle-all">Mark all as complete</label>',
					'<ul id="todo-list"></ul>',
				'</section>',
			'</section>'
		].join(''));

		this.$el.appendTo($parentEl);

		this.$list = $('#todo-list', this.$el);
		this.$main = $('#main', this.$el);
		this.$input = $('#new-todo', this.$el);
		this.$checkbox = $('#toggle-all', this.$el);

		this.$el.on('keypress', '#new-todo', this.onKeypress.bind(this));
		this.$el.on('click', '#clear-completed', this.onClear.bind(this));
		this.$el.on('click', '#toggle-all', this.onToggle.bind(this));

		this.collection.fetch()
			.then(this.render.bind(this));

	}

	TodoList.prototype.render = function() {

		this.$list.empty();

		if (this.collection.count() > 0) {

			this.collection.each(this.renderItem.bind(this));

			this.$main.show();

		} else {

			this.$main.hide();

		}

	};

	TodoList.prototype.renderItem = function(record) {

		var item = new TodoItem(record, this.$list);

		this.items.push(item);

		item.render();

	};

	TodoList.prototype.onKeypress = function(e) {

		if (e.keyCode != 13 || !this.$input.val()) {

			return;

		}

		var record = this.collection.create({title: this.$input.val()});

		record.save();

		this.render();

		this.$input.val('').focus();

		return false;

	};

	TodoList.prototype.onClear = function() {

		e.preventDefault();

		this.items.forEach(function(view) {

			if (view.model.get('done')) {

				view.destroy();

			}

		});

		this.render();

	};

	TodoList.prototype.onToggle = function() {

		var done = this.$checkbox.is(':checked');

		this.items.forEach(function(view) {

			view.toggleDone(done);

		});

		this.render();

	};

	return TodoList;

}(views.TodoItem));