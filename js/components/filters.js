

export default class Filters {
    constructor(){
        this.form = document.getElementById('filters');
        this.btn = document.getElementById('search')
    }

    onClick(callback){
        this.btn.onclick = (e) => {
            e.preventDefault();
            callback({
                type: 'all',
                word: 'test',
            });
        }
    }
}