'use strict'

var gBooks
const STORAGE_KEY = 'books'
var gSearch
var gPageIdx = 0
var PAGE_SIZE = 5


_createBooks()

function _createBook(name, price, rate = 0) {
    const book = {
        id: makeId(),
        name: (name) ? name : makeLorem(),
        price: (price) ? price : getRandomIntInclusive(10, 100),
        author: makeLorem(1),
        info: makeLorem(15),
        rate,
    }
    return book
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        console.log('hi');
        books = []
        for (var i = 0; i < 20; i++) {
            const book = _createBook()
            console.log(book);
            books.push(book)
        }
    }
    gBooks = books
    _saveToStorage()
}

function nextPage() {
    if ((gPageIdx + 1) * PAGE_SIZE >= gBooks.length) return
    gPageIdx++
}

function previusPage() {
    if (gPageIdx === 0) return
    gPageIdx--
}

function deleteBook(bookId) {
    const idxBook = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idxBook, 1)
    _saveToStorage()
}

function getBooks() {
    var books = gBooks.slice(gPageIdx * PAGE_SIZE, (gPageIdx + 1) * PAGE_SIZE)
    return books
}
function getBook(id) {
    return gBooks.find(book => book.id === id)
}
function addBook(name, price) {
    gBooks.unshift(_createBook(name, price))
    _saveToStorage()
}
function updatePrice(bookId, price) {
    const currBook = gBooks.find(book => book.id === bookId)
    console.log(currBook);
    currBook.price = price
    _saveToStorage()

}
function _saveToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function plusRate(id) {
    const currBook = gBooks.find(book => book.id === id)
    if (currBook.rate === 10) return currBook.rate
    currBook.rate++
    console.log(currBook.rate)
    if (currBook.rate <= 10) {
        _saveToStorage()
        return currBook.rate
    }
}

function minusRate(id) {
    const currBook = gBooks.find(book => book.id === id)
    if (currBook.rate === 0) return currBook.rate
    currBook.rate--
    if (currBook.rate >= 0) {
        _saveToStorage()
        return currBook.rate
    }
    else return
}

function setSort(val, filter) {
    var books
    if (val === -1) return books = gBooks.sort((a, b) => { return (a[filter] - b[filter]) })
    else return books = gBooks.sort((a, b) => { return (b[filter] - a[filter]) })
}


function sortByText(txt) {
    gSearch = true
    var booksToDisplay = []
    gBooks.forEach(book => {
        if (book.name.includes(txt)) booksToDisplay.push(book)
    })
    return booksToDisplay
}

function resetPageIdx() {
    gPageIdx = 0
}