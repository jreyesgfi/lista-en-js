import Alert from './alert.js'

export default class AddTodo{
    constructor(){
        this.btn = document.getElementById('add');

        this.title = document.getElementById('title');
        this.description = document.getElementById('description');

        this.alert = new Alert('alert');
    }
    onClick(callback) {
        this.btn.onclick = ()=>{
            if(title.value ===''|| description.value=== ''){
                    // alert.classList.remove('d-none');
                    // alert.innerText = 'Title and description are required';
                    // return;
                    this.alert.show('Title and description are required');
            } else {
                    callback(this.title.value, this.description.value);
                    this.alert.hide();
            }
        }
    }
}