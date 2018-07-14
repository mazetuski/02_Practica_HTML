export class Comments {
    constructor() {
        this.url = "http://localhost:3000/data";
        this.article = document.querySelector("#comments article");
        this.btnAdd = document.querySelector('#addComment');
        this.textArea = document.querySelector('#comment2');
        this.initialize();
    }

    initialize(){
        this.getData(this.putComments.bind(this));
        this.btnAdd.addEventListener('click', this.addComment.bind(this));
    }

    /**
     * Method for get comments from an api
     * @param callback
     */
    getData(callback){
        fetch(this.url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                callback(data);
            })
    }

    /**
     * Method for put comments in the page
     * @param data
     */
    putComments(data){
        console.log(data);
        data.forEach(item => {
            // check item
            if(!item) return;
            this.createElement(item.comment, this.article);
        });
    }

    /**
     * Method for create new container with the comment
     * @param comment
     */
    createElement(comment, parent){
        let container = document.createElement("DIV");
        let p = document.createElement("P");
        let text = document.createTextNode(comment);
        p.appendChild(text);
        container.appendChild(p);
        parent.appendChild(container);
    }

    addComment() {
        let comment = this.textArea.value;
        fetch(this.url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({"comment": comment})
        }).then(response => {
            // crate comment
            if(response.ok){
                this.createElement(comment, this.article);
            }
        })
    }
}