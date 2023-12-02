
let myLibrary = [];//Array storing Book Objects
if (localStorage.getItem('books') === null) {
    myLibrary = [];
} else {
    const booksFromStorage = JSON.parse(localStorage.getItem('books'));
    myLibrary = booksFromStorage;
}

function Book(title, author , pages, read){
    this.read = read;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function (){
        return `${this.title} by ${this.author}, ${this.pages} pages,
        , ${this.read}`;
    }
}
//Book Prototype
Book.prototype.toggleStatus = function(){
    if ( this.read === 'read'){
        this.read = 'not read'
    }else{
        this.read = 'read';
    }
}
//Total book info display
let total_books = document.querySelector('.total-books');
let unread_books = document.querySelector('.unread-books');
let read_books = document.querySelector('.read-books');

//update book info display
function bookInfo(){
    total_books.textContent = myLibrary.length;
    let read_total = 0,unread_total = 0;
    if(myLibrary.length > 0){
        myLibrary.forEach(libraryItem => {
            if(libraryItem.read === "read"){
                read_total++;
            } else if(libraryItem.read === "not read") {
                unread_total++;
            }
        });
    }
    unread_books.textContent = unread_total;
    read_books.textContent = read_total;
}


function DropDownToggle(){
    const addForm = document.querySelector('.add-form');
    let dropDown = document.querySelector('.add-dropdown');
    if(addForm.style.display === 'none'){
        addForm.style.display = 'block';
        dropDown.innerHTML = "<i class='fa-solid fa-chevron-right'></i>"
    }else{
        addForm.style.display = 'none';
        dropDown.innerHTML = "<i class='fa-solid fa-chevron-down'></i>"
    }
}
//Add Form inputs
let addBtn = document.getElementById('add');
let filter = document.getElementById('sort');


const deleteDialog = document.getElementById("delete-dialog");
const editDialog = document.getElementById("edit-dialog");
const deleteAllBtn = document.getElementById("delete-all");
const deleteBtn = document.querySelector(".delete");
const cancelBtn = document.querySelector(".cancel");
deleteAllBtn.addEventListener('click', () => {
    deleteDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    displayBooks();
    bookInfo();
    console.log("cancel")
    deleteDialog.close();
    
});
deleteBtn.addEventListener("click", () => {
    deleteBooks();
});


//Delete all Books
function deleteBooks(){
    myLibrary.length = 0;
    localStorage.clear();
    deleteDialog.close(); 
    bookInfo();
    displayBooks();
}


addBtn.addEventListener('click', getBookInfo);
function getBookInfo(e){
    e.preventDefault();
    let title_input = document.getElementById('title').value;
    let author_input = document.getElementById('author').value;
    let pageCount_input = document.getElementById('page-count').value;
    let readStatus_input = document.getElementById('status').value;
    console.log( `${title_input} by ${author_input}, ${pageCount_input} pages,
    , ${readStatus_input}`);
    if(title_input === "" || author_input === "" || pageCount_input === ""){
        return;
    }
    addBookToLibrary(title_input, author_input, pageCount_input, readStatus_input);
    //Clear form
    document.querySelector('.add-form').reset();
    console.log(myLibrary);
}

//Takes user input and stores book objects in array
function addBookToLibrary(title, author , pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    updateLocalStorage(myLibrary);
    displayBooks();
    bookInfo();
}

function updateLocalStorage(book){
    localStorage.setItem('books', JSON.stringify(book));
}

let table = document.getElementById('table-display');
//Display Books from Book array into table
function displayBooks(){
    let index = 0;
    table.textContent="";
    myLibrary.forEach(book =>{
        let row = document.createElement("tr");
        table.appendChild(row);
        
        //Adding Data Columns to the Table
        let bookTitle = document.createElement('td');
        bookTitle.textContent = book.title;
        row.appendChild(bookTitle);

        let bookAuthor = document.createElement('td');
        bookAuthor.textContent = book.author;
        row.appendChild(bookAuthor);

        let bookPages = document.createElement('td');
        bookPages.textContent = book.pages;
        bookPages.classList.add('page');
        row.appendChild(bookPages);

        let bookStatus = document.createElement('td');
        let statusDiv = document.createElement('div');
        if(book.read === "read"){
            statusDiv.classList.add('read-status');
        } else {
            statusDiv.classList.add('not-read-status');
        }
        statusDiv.textContent = book.read;
        bookStatus.appendChild(statusDiv);
        row.appendChild(bookStatus);

        let bookEditButton = document.createElement('td');
        let editingBtn = document.createElement('i'); 
        editingBtn.classList.add('fa-regular', 'fa-pen-to-square');
        editingBtn.dataset.editIndex = index;
        bookEditButton.appendChild(editingBtn);
        row.appendChild(bookEditButton);

        let bookRemoveButton = document.createElement('td');
        let removalBtn = document.createElement('i'); 
        removalBtn.classList.add('fa-solid', 'fa-trash');
        removalBtn.dataset.removeIndex = index;
        bookRemoveButton.appendChild(removalBtn);
        row.appendChild(bookRemoveButton);
        index++;
    });
}


table.addEventListener('click',function(e){
    if(e.target.classList.contains('fa-pen-to-square')){
        let rowIndex = e.target.dataset.editIndex;
        console.log('edit button');
        console.log(e.target);
        const edit = document.querySelector(".edit");
        document.getElementById('edit-title').value = myLibrary[rowIndex].title;
        document.getElementById('edit-author').value = myLibrary[rowIndex].author;
        document.getElementById('edit-pages').value = myLibrary[rowIndex].pages;
        document.getElementById('edit-status').value = myLibrary[rowIndex].read;
        editDialog.showModal();
        
        let cancel_edit_Btn = document.querySelector(".cancel-edit");
        cancel_edit_Btn.addEventListener('click', ()=>{
            editDialog.close();
        });
        edit.addEventListener('click', (e)=>{
            e.preventDefault();
            let title_edit_input = document.getElementById('edit-title').value;
            let author_edit_input = document.getElementById('edit-author').value;
            let pageCount_edit_input = document.getElementById('edit-pages').value;
            let readStatus_edit_input = document.getElementById('edit-status').value;
            myLibrary[rowIndex].title = title_edit_input;
            //myLibrary[rowIndex].title =  document.getElementById('edit-title').value;
            console.log("Value in title" + document.getElementById('edit-title').value);
            console.log('the title ..........'+ myLibrary[rowIndex].title);
            myLibrary[rowIndex].author = author_edit_input;
            myLibrary[rowIndex].pages = pageCount_edit_input;
            myLibrary[rowIndex].read = readStatus_edit_input;
            console.log("My Library after edit" + JSON.stringify(myLibrary[0]));
            updateLocalStorage(myLibrary);
            displayBooks();
            bookInfo();
            editDialog.close();
        });
        displayBooks();

        
    }else if(e.target.classList.contains('fa-trash')){
        console.log('delete button');
        console.log(e.target);
        let rowIndex = e.target.dataset.removeIndex;
        //table.deleteRow(rowIndex);
        myLibrary.splice(rowIndex,1);
        updateLocalStorage(myLibrary);
        displayBooks();
        //update local storage
        //update book info
        bookInfo();
    }else if (e.target.classList.contains('read-status') ||e.target.classList.contains('not-read-status') ){
        console.log('status');
        let bookIndex = (e.target.parentNode.parentNode.rowIndex - 1);
        console.log(bookIndex);
        toggleBookReadStatus(bookIndex);
    }
});
//Filtering Display by Sort Criteria
filter.addEventListener('change', function(){
    let selected = filter.selectedIndex;

    if(filter.options[selected].value === 'read'){
        console.log(' READ');
        let index = 0;
        table.textContent = '';
        myLibrary.forEach(libraryItem => {
            if(libraryItem.read === "read"){
                let row = document.createElement("tr");
                table.appendChild(row);
                
                //Adding Data Columns to the Table
                let bookTitle = document.createElement('td');
                bookTitle.textContent = libraryItem.title;
                row.appendChild(bookTitle);

                let bookAuthor = document.createElement('td');
                bookAuthor.textContent = libraryItem.author;
                row.appendChild(bookAuthor);

                let bookPages = document.createElement('td');
                bookPages.textContent = libraryItem.pages;
                bookPages.classList.add('page');
                row.appendChild(bookPages);

                let bookStatus = document.createElement('td');
                let statusDiv = document.createElement('div');
                statusDiv.classList.add('read-status');
    
                
                statusDiv.textContent = libraryItem.read;
                bookStatus.appendChild(statusDiv);
                row.appendChild(bookStatus);

                let bookEditButton = document.createElement('td');
                let editingBtn = document.createElement('i'); 
                editingBtn.classList.add('fa-regular', 'fa-pen-to-square');
                editingBtn.dataset.editIndex = index;
                bookEditButton.appendChild(editingBtn);
                row.appendChild(bookEditButton);

                let bookRemoveButton = document.createElement('td');
                let removalBtn = document.createElement('i'); 
                removalBtn.classList.add('fa-solid', 'fa-trash');
                removalBtn.dataset.removeIndex = index;
                bookRemoveButton.appendChild(removalBtn);
                row.appendChild(bookRemoveButton);
                index++;
            }
        });
    }else if (filter.options[selected].value === 'not read'){
        console.log('NOT READ');
       // let index = 0;
        table.textContent = '';
        myLibrary.forEach((libraryItem, index) => {
            if(libraryItem.read === "not read"){
                        let row = document.createElement("tr");
                        table.appendChild(row);
                        console.log('index is ' + index);
                        //Adding Data Columns to the Table
                        let bookTitle = document.createElement('td');
                        bookTitle.textContent = libraryItem.title;
                        row.appendChild(bookTitle);
        
                        let bookAuthor = document.createElement('td');
                        bookAuthor.textContent = libraryItem.author;
                        row.appendChild(bookAuthor);
        
                        let bookPages = document.createElement('td');
                        bookPages.textContent = libraryItem.pages;
                        bookPages.classList.add('page');
                        row.appendChild(bookPages);
        
                        let bookStatus = document.createElement('td');
                        let statusDiv = document.createElement('div');
                        statusDiv.classList.add('not-read-status');
            
                        
                        statusDiv.textContent = libraryItem.read;
                        bookStatus.appendChild(statusDiv);
                        row.appendChild(bookStatus);
        
                        let bookEditButton = document.createElement('td');
                        let editingBtn = document.createElement('i'); 
                        editingBtn.classList.add('fa-regular', 'fa-pen-to-square');
                        editingBtn.dataset.editIndex = index;
                        bookEditButton.appendChild(editingBtn);
                        row.appendChild(bookEditButton);
        
                        let bookRemoveButton = document.createElement('td');
                        let removalBtn = document.createElement('i'); 
                        removalBtn.classList.add('fa-solid', 'fa-trash');
                        removalBtn.dataset.removeIndex = index;
                        bookRemoveButton.appendChild(removalBtn);
                        row.appendChild(bookRemoveButton);
                        //index++;
                    }
        });
    }else{
        displayBooks();
        bookInfo();
    }
});


//Toggles book object read status
function toggleBookReadStatus(i){
    //Creates an empty Book object
    let target =  Object.create(Book.prototype);
    console.log( Object.create(Book.prototype) instanceof Book);
    console.log("THis is target" + JSON.stringify(target));
    //myLibrary[i] is type [object Object]
    let source = myLibrary[i];
    //moving empty [Object object] to Book object (target)
    const returnedTarget = Object.assign(target, source);
    console.log("trying to toggle");
    console.log("THis is target after" + JSON.stringify(target));

    console.log("Returned target after" + JSON.stringify(returnedTarget));
    target.toggleStatus();
    console.log("Returned target after ater ................" + JSON.stringify(target));
    myLibrary[i] = target;
    displayBooks();
    bookInfo();
}
bookInfo();
displayBooks();

