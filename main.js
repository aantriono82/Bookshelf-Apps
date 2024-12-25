const bookForm = document.getElementById('bookForm');

const incompleteBookList = document.getElementById('incompleteBookList');

const completeBookList = document.getElementById('completeBookList');

// Event Listener untuk menambahkan buku

bookForm.addEventListener('submit', function (event) {

  event.preventDefault();

  const id = Date.now().toString();

  const title = document.getElementById('bookFormTitle').value.trim();

  const author = document.getElementById('bookFormAuthor').value.trim();

  const year = parseInt(document.getElementById('bookFormYear').value.trim());

  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const book = { id, title, author, year, isComplete };

  if (title && author && year) {

    addBookToDOM(book);

    saveBookToStorage(book);

    bookForm.reset();

  }

});

// Fungsi untuk memuat data buku dari localStorage

document.addEventListener('DOMContentLoaded', function () {

  const books = loadBooksFromStorage();

  books.forEach(addBookToDOM);

});

// Fungsi untuk menambahkan buku ke DOM

function addBookToDOM(book) {

  const bookItem = document.createElement('div');

  bookItem.setAttribute('data-bookid', book.id);

  bookItem.setAttribute('data-testid', 'bookItem');

  bookItem.innerHTML = `

    <h3 data-testid="bookItemTitle">${book.title}</h3>

    <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>

    <p data-testid="bookItemYear">Tahun: ${book.year}</p>

    <div>

      <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Selesai Dibaca' : 'Belum Selesai Dibaca'}</button>

      <button data-testid="bookItemDeleteButton">Hapus Buku</button>

      <button data-testid="bookItemEditButton">Edit Buku</button>

    </div>

  `;

  const isCompleteButton = bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]');

  const editButton = bookItem.querySelector('[data-testid="bookItemEditButton"]');

  const deleteButton = bookItem.querySelector('[data-testid="bookItemDeleteButton"]');

  // Event: Toggle Status Buku

  isCompleteButton.addEventListener('click', function () {

    book.isComplete = !book.isComplete;

    isCompleteButton.textContent = book.isComplete ? 'Selesai Dibaca' : 'Belum Selesai Dibaca';

    updateBookInStorage(book);

    bookItem.remove();

    addBookToDOM(book);

  });

  // Event: Edit Buku

  editButton.addEventListener('click', function () {

    const newTitle = prompt('Masukkan judul baru:', book.title);

    const newAuthor = prompt('Masukkan penulis baru:', book.author);

    const newYear = prompt('Masukkan tahun baru:', book.year);

    if (newTitle && newAuthor && newYear) {

      book.title = newTitle.trim();

      book.author = newAuthor.trim();

      book.year = newYear.trim();

      updateBookInStorage(book);

      bookItem.querySelector('[data-testid="bookItemTitle"]').textContent = book.title;

      bookItem.querySelector('[data-testid="bookItemAuthor"]').textContent = `Penulis: ${book.author}`;

      bookItem.querySelector('[data-testid="bookItemYear"]').textContent = `Tahun: ${book.year}`;

    }

  });

  // Event: Hapus Buku

  deleteButton.addEventListener('click', function () {

    bookItem.remove();

    removeBookFromStorage(book.id);

  });

  if (book.isComplete) {

    completeBookList.appendChild(bookItem);

  } else {

    incompleteBookList.appendChild(bookItem);

  }

}

// Fungsi penyimpanan dan pemuatan buku dari localStorage

function saveBookToStorage(book) {

  const books = loadBooksFromStorage();

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books));

}

function loadBooksFromStorage() {

  return JSON.parse(localStorage.getItem('books')) || [];

}

function updateBookInStorage(updatedBook) {

  const books = loadBooksFromStorage();

  const bookIndex = books.findIndex(book => book.id === updatedBook.id);

  if (bookIndex !== -1) books[bookIndex] = updatedBook;

  localStorage.setItem('books', JSON.stringify(books));

}

function removeBookFromStorage(bookId) {

  const books = loadBooksFromStorage();

  const updatedBooks = books.filter(book => book.id !== bookId);

  localStorage.setItem('books', JSON.stringify(updatedBooks));

}
