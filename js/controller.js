

function onInit() {
    getGLang()
    renderBooks()
    renderFilterByQueryStringParams()
}

function renderBooks(books) {
    strHTML = ''
    if (!books) {
        var books = []
        books = getBooks()
    }
    document.querySelector("tbody").innerHTML = `<tr class='table-dark'>
    <th  data-trans="id">Id</th>
    <th class="name" data-trans="book-name">Title</th>
    <th  data-trans="price">Price</th>
    <th class="actions" data-trans="actions">Actions</th>
    <th  data-trans="rate">Rate</th>
    </tr>`
    strHTML = books.map(book => `<tr class='table-light'>
    <td  >${book.id}</td>
    <td class="name" >${book.name}</td>
    <td >${book.price}$</td>
    <td >
    <button onclick="onReadBook('${book.id}')" class="read" data-trans="info">Info</button>
    <button onclick="onUpdateBook('${book.id}')" class="update" data-trans="update">Update</button>
    <button onclick="onDeleteBook('${book.id}')" class="delete" data-trans="delete">Delete</button>
    <td >${book.rate}</td>
    </td>
    </tr>`)
    document.querySelector("tbody").innerHTML += strHTML.join('')
    const lang = getGLang()
    onLang(lang)
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

function onSetSort(val, filter) {
    console.log(val, filter);
    var books = setSort(val, filter)
    resetPageIdx()
    renderBooks()


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
    const filterBy = {
        search: queryStringParams.get('search') || '',
        lang: queryStringParams.get('lang')
    }
    console.log(filterBy);
    if (!filterBy.lang && !filterBy.search) return
    if (filterBy.lang) {
        onLang(filterBy.lang)
    }
    else if (filterBy.search) {
        document.querySelector("input[name=search]").value = filterBy.search
        var books = sortByText(filterBy.search)
        renderBooks(books)
    }
}

function onNextPage() {
    nextPage()
    renderBooks()
}
function onPreviusPage() {
    previusPage()
    renderBooks()
}

function onLang(lang) {
    if (lang === 'he') {
        document.body.classList.add("lang-he")
        updateGLang(lang)
        const queryStringParams = `?lang=${lang}`
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
        saveToStorage('LANG', lang)

    } else {
        document.body.classList.remove("lang-he")
        updateGLang(lang)
        const queryStringParams = `?lang=${lang}`
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
        window.history.pushState({ path: newUrl }, '', newUrl)
        saveToStorage('LANG', lang)
    }
    doTrans()
}
