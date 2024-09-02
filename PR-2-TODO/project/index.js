const express = require('express');
const app = express();

app.use(express.json());

let todos = [
    { title: 'HTML', isCompleted: true, id: 1 },
    { title: 'JavaScript', isCompleted: true, id: 2 },
    { title: 'React', isCompleted: false, id: 3 }
];

app.get('/', (req, res) => {
    res.send('Welcome to the Todo API');
});

app.get('/todos', (req, res) => {
    res.send(todos);
});

app.post('/addtodo', (req, res) => {
    const { title, isCompleted } = req.body;
    if (!title || typeof isCompleted !== 'boolean') {
        res.send('Invalid data');
        return;
    }
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const newTodo = { title, isCompleted, id: newId };
    todos.push(newTodo);
    res.send(newTodo);
});

app.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        res.send('Todo not found');
        return;
    }
    if (title !== undefined) todo.title = title;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;
    res.send(todo);
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(t => t.id === parseInt(id));
    if (index === -1) {
        res.send('Todo not found');
        return;
    }
    const deletedTodo = todos.splice(index, 1)[0];
    res.send({ deletedTodo, todos });
});

app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = todos.find(t => t.id === parseInt(id));
    if (!todo) {
        res.send('Todo not found');
        return;
    }
    res.send(todo);
});

app.get('/findbystatus', (req, res) => {
    const { isCompleted } = req.query;
    if (isCompleted === undefined) {
        res.send('Query parameter isCompleted is required');
        return;
    }
    const completed = isCompleted === 'true';
    const filteredTodos = todos.filter(t => t.isCompleted === completed);
    res.send(filteredTodos);
});

const port = 8090;
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
