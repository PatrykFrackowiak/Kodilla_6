'use strict'

const addEventListenerToTitleLinks = function () {
    for (let link of document.querySelectorAll('.titles a')) {
        link.addEventListener('click', titleClickHandler);
    }
}

const generateTitleLinks = function () {
    const SELECTOR = {
        ARTICLE: '.post',
        TITLE: '.post-title',
        TITLE_LIST: '.titles'
    };

    let links = '';
    for (let article of document.querySelectorAll(SELECTOR.ARTICLE)) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector(SELECTOR.TITLE).innerHTML;
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        links += linkHTML;
    }

    document.querySelector(SELECTOR.TITLE_LIST).innerHTML = links;
    addEventListenerToTitleLinks();
}

const changeActiveElement = (element, elementSelector) => {
    for (let activeLink of document.querySelectorAll(elementSelector + '.active')) {
        activeLink.classList.remove('active');
    }
    element.classList.add('active');
}

const titleClickHandler = function (event) {
    const SELECTOR = {
        ARTICLE: '.article',
        TITLELINK: '.titles a',
    };
    
    event.preventDefault();
    changeActiveElement(this, SELECTOR.TITLELINK);
    const articleId = link.getAttribute('href');
    const article = document.querySelector(articleId);
    changeActiveElement(article, SELECTOR.ARTICLE);
}

