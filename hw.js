
class Book {
  constructor(title) {
    this.title = title;

  }

  static fromJSON(json) {
    return new Book(
      json.title,
   
    );
  }
}

class UI {
  constructor() {
    this.form = document.getElementById('form');

    this.title = document.getElementById('title-input');


    this.tableBody = document.getElementById('table-body');

    this.form.addEventListener('submit', (e) => this.onFormSubmit(e));

    this.books = [];
    this.loadBooksFromLocalStorage();
    this.renderBookTable();
  }

  onFormSubmit(e) {
    e.preventDefault();

    const book = new Book(
      this.title.value,
    
    );

    this.books.push(book);

    this.saveBooksToLocalStorage();
    this.renderBookTable();
  }

  renderBookTable() {
    this.tableBody.innerHTML = '';

    for (let i = 0; i < this.books.length; i++) {
      const book = this.books[i];

      const tr = this.createBookTableRow(book);
      this.tableBody.appendChild(tr);
    }
  }

  /*
    <tr>
      <td></td> // title
      <td></td> // author
      <td></td> // isbn 
      <td></td> // actions
    </tr>
  */
  createBookTableRow(book) {
    const tr = document.createElement('tr');

    const tdTitle = document.createElement('td');
    const tdCompleted = document.createElement('td');


    const tdActions = document.createElement('td');

    tdTitle.innerHTML = book.title;
  

    const removeButton = this.createRemoveBookButton(book);
    tdActions.appendChild(removeButton);

    const completedButton = this.createCompletedButton(book);
    tdCompleted.appendChild(completedButton);



    tr.appendChild(tdTitle);
    tr.appendChild(tdCompleted);

    tr.appendChild(tdActions);



    return tr;
  }

  createRemoveBookButton(book) {
    const button = document.createElement('button');

    button.setAttribute('class', 'btn btn-danger btn-sm');
    button.innerHTML = 'X'
    button.addEventListener('click', () => this.onRemoveBookClicked(book));

    return button;
  }

  createCompletedButton(book) {
   const button = document.createElement('button');

    button.setAttribute('class', 'btn btn-light btn-sm');
    button.innerHTML = ('&#10003');


    button.addEventListener('click', function onClick() {

      button.style.backgroundColor = 'green';
      button.style.color = 'white';
    });


   // button.addEventListener('click', () => this.onCompletedBookClicked(book));
  //  button.addEventListener('click', (button.setAttribute('class', 'btn btn-success btn-sm')));
    return button;
  }

  onRemoveBookClicked(book) {
    this.books = this.books.filter((x) => {
      return book.title !== x.title;
    });

    this.saveBooksToLocalStorage();
    this.renderBookTable();
  }

  onCompletedBookClicked(book) {
    /*this.books = this.books.filter((x) => {
      return book.isbn !== x.isbn;
    });*/

    this.saveBooksToLocalStorage();
    this.renderBookTable();
  }

  saveBooksToLocalStorage() {
    const json = JSON.stringify(this.books);
    localStorage.setItem('books', json);
  }

  loadBooksFromLocalStorage() {
    const json = localStorage.getItem('books');
    if (json) {
      const bookArr = JSON.parse(json);
      this.books = bookArr.map(x => Book.fromJSON(x));
    }
  }
}

const ui = new UI();