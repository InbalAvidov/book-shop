

function onInit() {
    renderBooks()
    renderFilterByQueryStringParams()
}

function renderBooks(books) {
    strHTML = ''
    if (!books) {
        var books = []
        books = getBooks()
    }
    document.querySelector("tbody").innerHTML = `<tr>
    <th class="cell">Id</th>
    <th class="cell name">Title</th>
    <th class="cell">Price</th>
    <th class="cell actions">Actions</th>
    <th class="cell">Rate</th>
    </tr>`
    strHTML = books.map(book => `<tr>
    <td class="cell">${book.id}</td>
    <td class="cell name">${book.name}</td>
    <td class="cell">${book.price}$</td>
    <td class="cell">
    <button onclick="onReadBook('${book.id}')" class="read">Info</button>
    <button onclick="onUpdateBook('${book.id}')" class="update">Update</button>
    <button onclick="onDeleteBook('${book.id}')" class="delete">Delete</button>
    <td class="cell">${book.rate}</td>
    </td>
    </tr>`)
    document.querySelector("tbody").innerHTML += strHTML.join('')
}
function onReadBook(bookId) {
    const book = getBook(bookId)
    const elRate = document.querySelector(".rate-value")
    elRate.innerText = book.rate
    const elModal = document.querySelector(".modal")
    elModal.id = book.id
    elModal.querySelector("h2").innerText = book.name
    elModal.querySelector(".author").innerText += book.author
    elModal.querySelector(".info").innerText += book.info
    elModal.classList.add("open")
}

function onCloseModal() {
    const elModal = document.querySelector(".modal")
    elModal.classList.remove("open")
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}

function onAddBook() {
    const name = prompt("book name")
    if (!name) return
    const price = prompt("book price")
    addBook(name, price)
    renderBooks()
}

function onUpdateBook(bookId) {
    console.log(bookId);
    var newPrice = prompt("New price")
    updatePrice(bookId, newPrice)
    renderBooks()
}

function onPlusRate(id) {
    const elModal = document.querySelector(".modal")
    const elRate = document.querySelector(".rate-value")
    const newRate = plusRate(elModal.id)
    elRate.innerText = newRate
    renderBooks()
}

function onMinusRate(id) {
    const elModal = document.querySelector(".modal")
    const elRate = document.querySelector(".rate-value")
    const newRate = minusRate(elModal.id)
    elRate.innerText = newRate
    renderBooks()
}

function onSetSortByRate(val) {
    document.querySelector(".filter-book-price").value = 0
    var books = setSortByRate(val.minRate)
    renderBooks(books)

    const queryStringParams = `?filter=${val}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onSetSortByPrice(val) {
    document.querySelector(".filter-book-rate").value = 0
    var books = setSortByPrice(val.minPrice)
    renderBooks(books)

    const queryStringParams = `?filter=${val}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function onSearch(ev) {
    ev.preventDefault()
    const text = document.querySelector("input[name=search]").value
    var books = sortByText(text)
    renderBooks(books)
    const queryStringParams = `?search=${text}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    console.log(queryStringParams);
    const filterBy = {
        rate: queryStringParams.get('rate') || '',
        price: queryStringParams.get('price') || '',
        search: queryStringParams.get('search') || ''
    }
    if (!filterBy.rate && !filterBy.price && !filterBy.search) return
    if (filterBy.rate) {
        document.querySelector(".filter-book-rate").value = filterBy.filter
        setSortByRate(filterBy.filter)
    }
    else if (filterBy.price) {
        document.querySelector(".filter-book-price").value = filterBy.filter
        setSortByPrice(filterBy.filter)
    }
    else if (filterBy.search) {
        document.querySelector("input[name=search]").value = filterBy.search
        var books = sortByText(filterBy.search)
        renderBooks(books)
    }
}

function onNextPage(){
    nextPage()
    renderBooks()
}
function onPreviusPage(){
    previusPage()
    renderBooks()
}