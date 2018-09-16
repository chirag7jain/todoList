const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems

module.exports = (app) => {
  app.get('/api/v1/todos', todosController.list)
  app.post('/api/v1/todos', todosController.create);
  app.get('/api/v1/todos/:id', todosController.show)
  app.put('/api/v1/todos/:id', todosController.update);
  app.delete('/api/v1/todos/:id', todosController.destroy);
  app.post('/api/v1/todos/:todoId/items', todoItemsController.create);
  app.put('/api/v1/todos/:todoId/items/:id', todoItemsController.update);
  app.delete('/api/v1/todos/:todoId/items/:id', todoItemsController.destroy);
};