new Vue({
    el: "#app",
    data: {
        toDos : [],
        users : [],
        author_id : 0,
        title : '',
        description : '',
        stautus : 1,
    },
    methods: {
        getTodos() {
            let url ="http://localhost:3000/api/book";
            axios.get(url).then(response => {
                this.toDos = response.data;
            })
        },
        addCard() {
            let newObj = {}; 
            newObj.author_id = Number(this.author_id);
            newObj.title = this.title;
            newObj.body = this.description;
            console.log(newObj);
            axios.post('http://localhost:3000/api/book',newObj).then(res=>{
                this.toDos = res.data;
                this.getTodos();
            })
        },
        deletePost(id){
            axios.delete('http://localhost:3000/api/book/'+Number(id)).then(res => {
                this.toDos = res.data.data;
                this.getTodos();
            })
        },
        updateBook(){
            let book = {
                title:this.title,
                body: this.description,
                author_id: Number(this.author_id)
            }
            console.log(book);
            axios.put(this.url+"/"+this.updateId,book).then(res => {
                console.log("updated");
                console.log(res.data);
            });
        }
    },
    mounted() {
        this.getTodos();
    },
})