define(['backbone', 'views/todo'], function(Backbone, TodoView) {

	return Backbone.View.extend({

		id: 'todoapp',
		tagName: 'div',
		container: $('body'),
		template: _.template([
			'<header>',
				'<h1>Todos</h1>',
				'<input id="new-todo" type="text" placeholder="What needs to be done?">',
			'</header>',
			'<section id="main">',
				'<input id="toggle-all" type="checkbox">',
				'<label for="toggle-all">Mark all as complete</label>',
				'<ul id="todo-list"></ul>',
			'</section>',
			'<footer></footer>'
		].join('')),
		statsTemplate: _.template([
			'<% if (done) { %>',
			'<a id="clear-completed">Clear <%= done %> completed <%= done == 1 ? "item" : "items" %></a>',
			'<% } %>',
			'<div class="todo-count"><b><%= remaining %></b> <%= remaining == 1 ? "item" : "items" %> left</div>'
		].join('')),
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},

		initialize: function() {

			this.$el.html(this.template());
			this.input = this.$('#new-todo');
			this.allCheckbox = this.$('#toggle-all')[0];
			this.footer = this.$('footer');
			this.main = this.$('#main');

			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'reset', this.addAll);
			this.listenTo(this.collection, 'all', this.render);

			this.collection.fetch();

		},

		render: function() {

			var done = this.collection.done().length,
				remaining = this.collection.remaining().length;

			this.$el.appendTo(this.container);

			if (this.collection.length) {

				this.main.show();
				this.footer.show();
				this.footer.html(this.statsTemplate({
					done: done,
					remaining: remaining
				}));

			} else {

				this.main.hide();
				this.footer.hide();

			}

			this.allCheckbox.checked = !remaining;

		},

		addOne: function(todo) {

			var view = new TodoView({model: todo});

			this.$('#todo-list').append(view.render().el);

		},

		addAll: function() {

			this.collection.each(this.addOne, this);

		},

		createOnEnter: function(e) {

			if (e.keyCode != 13 || !this.input.val()) {

				return;

			}

			this.collection.create({title: this.input.val()});
			this.input.val('');

		},

		clearCompleted: function() {

			_.invoke(this.collection.done(), 'destroy');

			return false;

		},

		toggleAllComplete: function() {

			var done = this.allCheckbox.checked;

			this.collection.each(function(todo) {

				todo.save({'done': done});

			});

		}

	});

});