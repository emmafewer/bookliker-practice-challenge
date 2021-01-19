document.addEventListener("DOMContentLoaded", function() {
    fetchAllBooks();

    //RENDER
    function renderBookList(book) {
        let ul = document.getElementById('list')
        let li = document.createElement('li')
        li.id = book.id
        li.textContent = book.title
        li.addEventListener('click', handleClick)
        ul.appendChild(li)
    }

    //DATA
    //GET
    function fetchAllBooks() {
        fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(books => {
            books.forEach(book => renderBookList(book))
        })
    }

    function fetchOne(id) {
        fetch(`http://localhost:3000/books/${id}`)
        .then(res => res.json())
        .then(book => loadBook(book))
    }



    // Change DOM Elements
    function loadBook(book) {
        let container = document.getElementById("show-panel")
        container.innerHTML = ""
        let bookImg = document.createElement('img')
        let bookTitle = document.createElement('h2')
        let bookSubtitle = document.createElement('h3')
        let bookAuthor = document.createElement('h3')
        let description = document.createElement('p')
        let likesUl = document.createElement('ul')
        let likeBtn = document.createElement('button')

        bookImg.src = book.img_url
        bookImg.style.width = '100px'
        bookTitle.textContent = book.title
        bookSubtitle.textContent = book.subtitle 
        bookAuthor.textContent = book.author 
        description.textContent = book.description
        book.users.forEach(function(name) {
            let li = document.createElement('li')
            likesUl.appendChild(li)
            li.textContent += name.username
        })
        likeBtn.textContent = "Like"
        likeBtn.addEventListener("click", () => patchLike(book))

        container.append(bookImg, bookTitle, bookSubtitle, bookAuthor, description, likesUl, likeBtn)
    }

    //PATCH

    function patchLike(book) {
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
                "users": [
                    {"id":2, "username":"auer"},
                    {"id":8, "username":"maverick"},
                    {"id":1, "username":"pouros"}
                ]
            })
          })
          .then(res => res.json())
          .then(book => {
              loadBook(book)
            })
          .catch(error => console.log(error))
    }

    //Handle Event Listener
    function handleClick(e) {
        console.log(e.target.id)
        fetchOne(e.target.id)
    }

});
