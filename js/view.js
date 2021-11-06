import AddTodo from './components/add-todo.js'

export default class View {
    constructor(){
        this.model = null;

        this.table = document.getElementById('table');
        
        this.addTodoForm = new AddTodo();

        this.addTodoForm.onClick((title, description) => this.addTodo(title,description))
    }

    setModel(model) {
        this.model = model;
        this.render();
    }

    render() {
        const todos = this.model.getTodos();
        //for (const todo of todos) { // En JS for (const i in todos) devuelve el índice y for(const todo of todos) los objetos
            //this.createRow(todo);
        //}
        todos.forEach((todo)=> this.createRow(todo));
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    addTodo(title,description) {
        const todo = this.model.addTodo(title,description)
        this.createRow(todo);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    } 

    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);

        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class= "text-center">

        </td>
        <td class= "text-right">
            <button class="btn btn-primary mb-1">
            <i class = "fa fa-pencil"></i>
        </td>
        `;
    
        //Creamos la checkbox
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        //Creamos el botón eliminar
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class = "fa fa-trash"></i>';
        removeBtn.onclick = ()=> this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}