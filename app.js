//Total book info display
let total_books = document.querySelector('.total-books');
let unread_books = document.querySelector('.unread-books');
let read_books = document.querySelector('.read-books');


//update book info display
function bookInfo(){
    total_books.textContent = myLibrary.length;
    let read_total,unread_total = 0;
    myLibrary.forEach(libraryItem => {
        if(libraryItem.read === "read"){
            read_total++;
        } else {
            unread_total++;
        }
    });
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
let filter = document.getElementById('filter');


const deleteDialog = document.getElementById("delete-dialog");
const editDialog = document.getElementById("edit-dialog");
const deleteAllBtn = document.getElementById("delete-all");
const editBtn = document.querySelector('.fa-pen-to-square');
const deleteBtn = document.querySelector(".delete");
const cancelBtn = document.querySelector(".cancel");
deleteAllBtn.addEventListener('click', () => {
    deleteDialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    deleteDialog.close();
});
deleteBtn.addEventListener("click", () => {
    deleteBooks();
    deleteDialog.close(); 
});


//Delete all Books
function deleteBooks(){
    myLibrary.length = 0;
    localStorage.clear();
}
editBtn.addEventListener('click', () => {
    editDialog.showModal();
});


let myLibrary = [];//Array storing Book Objects
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

addBtn.addEventListener('click', getBookInfo);
//parseInt(e.toElement.attributes.librarybookid.value);
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
    displayBooks();
    console.log(myLibrary);
}

//Takes user input and stores book objects in array
function addBookToLibrary(title, author , pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    updateLocalStorage();
    displayBooks();
    bookInfo();
    //localStorage.setItem('books', JSON.stringify(books));
}
function updateLocalStorage(){
    localStorage.setItem('books', JSON.stringify(myLibrary));
}
let table = document.getElementById('table-display');
//Display Books from Book array into table
function displayBooks(){
    let index = 0;
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



//create book object , create book item with index to indentify item from table , append that to tab;e 
//create each book colum html element adding content and appropriate class; book item is a single book
//-- set attribute class 
//splice , map save and  render




/*
Toggles book object read status
*/
/*function ToggleBookReadStatus(){

}

/*
Edit book information
*/
/*function EditBook(){
    updateLocalStorage();
}

/*
Delete all Books
*/
/*function deleteBooks(){
    myLibrary.length = 0;
}
function filterBooks(){

}
/*
Deletes a book
*/
/*function RemoveBook(){


}
let statusBtnId = e.target.id;
  let removeBtnId = e.target.dataset.id;
  let index;
 

  // change the text content and class of the button
  if (e.target.className === 'far fa-times-circle') {
*/