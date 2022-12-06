'use strict'

const gTrans = {
    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    home:{
        en:'Home',
        he:'ראשי'
    },
    'search-btn': {
        en: 'search',
        he: 'חיפוש'
    },
    'rate-filter': {
        en: 'Rate',
        he: 'דירוג'
    },
    'price-filter': {
        en: 'Price',
        he: 'מחיר'
    },
    'rate-min':{
        en:'min rate',
        he:'נמוך תחילה'
    },
    'rate-max':{
        en:'max rate',
        he:'גבוה תחילה'
    },
    'price-min':{
        en:'min price',
        he:'זול תחילה'
    },
    'price-max':{
        en:'max price',
        he:'יקר תחילה'
    },
    'add': {
        en: 'Add a new book',
        he: 'הוסף ספר חדש'
    },
    'id': {
        en: 'Id',
        he: 'מק"ט'
    },
    'book-name': {
        en: 'Book name',
        he: 'שם הספר'
    },
    'price': {
        en: 'Price',
        he: 'מחיר'
    },
    'actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'info': {
        en: 'Info',
        he: 'מידע'
    },
    'update': {
        en: 'Update',
        he: 'עדכן'
    },
    'delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'prev-page': {
        en: 'Back',
        he: 'חזור'
    },
    'next-page': {
        en: 'next',
        he: 'הבא'
    },
    author: {
        en: 'written by ',
        he: ' :נכתב על ידי'
    },
    description: {
        en: 'discription',
        he: 'תיאור'
    },
}

var gCurrLang 

function getTrans(transKey){
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    var translation = key[gCurrLang]
    if (!translation) return key.en
    return translation
}

function doTrans(){
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const trans = getTrans(transKey)
        el.innerText = trans
    })
}

function updateGLang(lang){
    gCurrLang = lang
}

function getGLang(){
    gCurrLang = loadFromStorage('LANG')
    if(!gCurrLang) gCurrLang = 'en'
    return gCurrLang
}