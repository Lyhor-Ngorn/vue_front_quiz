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
        updatePost(id){
            axios.put('http://localhost:3000/api/book/'+id).then(res =>{
                    let newText = prompt("EDIT YOUR TEXT IT",res.data.text)
                    let arr = res.data;
                    console.log(arr);
                    arr[0].text = newText;
                    console.log(arr);
                    axios.post('http://'+this.url+':3000/update',arr[0]).then(res=>{
                        this.data = res.data;
                        this.newObj = {};
                        this.getData();
                    })
                }
                
            )
        },
    },
    mounted() {
        this.getTodos();
    },
})