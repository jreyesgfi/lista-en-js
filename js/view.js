import AddTodo from './components/add-todo.js'
import Modal from './components/modal.js'
import Filters from './components/filters.js';

export default class View {
    constructor(){
        this.model = null;

        this.table = document.getElementById('table');
        
        //addTodo
        this.addTodoForm = new AddTodo();
        this.addTodoForm.onClick((title, description) => this.addTodo(title,description))

        //modal
        this.modal = new Modal();
        this.modal.onClick((id, values)=> this.editTodo(id,values));

        //filter
        this.filters = new Filters();
        this.filters.onClick((filters) => this.filter(filters));
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
    
    editTodo(id,values){
        const todo = this.model.editTodo(id,values);
        const fila = document.getElementById(id);
        const filaNum = fila.rowIndex;
        this.createRow(todo, filaNum);
        fila.remove();
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    } 

    filter(filters) {
        console.log(filters.word);
    }

    createRow(todo, fila){
        var row = null;
        if (typeof(fila) === 'number'){
            row = table.insertRow(fila);
        }
        else{
            row = table.insertRow();
        }
        row.setAttribute('id', todo.id);

        row.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class= "text-center">

        </td>
        <td class= "text-right">

        </td>
        `;
    
        //Creamos la checkbox
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toggleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        //Creamos el botón editar
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1');
        editBtn.innerHTML = '<i class = "fa fa-pencil"></i>';
        editBtn.setAttribute('data-toggle', 'modal');
        editBtn.setAttribute('data-target', '#modal');
        editBtn.onclick = ()=> this.modal.setValues(todo);
        row.children[3].appendChild(editBtn);

        //Creamos el botón eliminar
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class = "fa fa-trash"></i>';
        removeBtn.onclick = ()=> this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);
    }
}