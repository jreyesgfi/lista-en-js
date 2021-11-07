export default class Model {
    constructor() {
        this.view = null;
        this.todos = JSON.parse(localStorage.getItem('todos')); //Parse -> pasar un JSON a JavaScript
        if (!this.todos || this.todos.length < 1){
            this.todos = [
                {
                    id:0,
                    title: 'Lean JS',
                    description: 'Watch JS Tutorials',
                    completed: false,
                }
            ]
            this.currentId = 1;
        }
        else {
            this.currentId = this.todos[this.todos.length-1].id + 1;
        }
    }

    setView(view){
        this.view = view
    }

    save(){
        localStorage.setItem('todos',JSON.stringify(this.todos));
    }

    findTodo(id) {
        //De esta manera encontramos el todo aunque el id no coincida con el index 
        return this.todos.findIndex((todo) => todo.id == id);//findIndex es una función la cual toma como argumento la función que va a usar para comprobar si dos objetos son iguales
    }

    getTodos(){
        return this.todos
    }

    toggleCompleted(id) {
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }

    addTodo(title, description){
        console.log(title, description)
        const todo = { //Creamos un objeto
            id:this.currentId++,
            title, //Con esta sintaxis indicamos title = title
            description,
            completed: false,
        }
        this.todos.push(todo);
        this.save();

        return {...todo}; //Con esta sintaxis indicamos que nos cree un objeto copia del objeto todo
    }

    editTodo(id,values){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.title = values.title;
        todo.description = values.description;
        todo.completed = values.completed;
        this.save();
        return todo;
    }

    removeTodo(id){
        const index = this.findTodo(id);
        this.todos.splice(index, 1);//Borramos un elemento empezando por todos[index]
        this.save();
    }
}