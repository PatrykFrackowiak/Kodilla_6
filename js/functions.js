'use strict'

const addEventListenerToTitleLinks = function () {
    for (let link of document.querySelectorAll('.titles a')) {
        link.addEventListener('click', titleClickHandler);
    }
}

const titleClickHandler = function (event) {
    const handle = function (clickedElement) {
        console.log('Link was clicked!');
        event.preventDefault();
        deactivateLinks()
        activateLink(clickedElement);
        deactivateArticles();
        activateArticle(clickedElement);
    }

    const deactivateLinks = function () {
        for (let activeLink of document.querySelectorAll('.titles a.active')) {
            activeLink.classList.remove('active');
        }
    }

    const activateLink = function (link) {
        link.classList.add('active');
    }

    const deactivateArticles = function () {
        for (let activeLink of document.querySelectorAll('article.active')) {
            activeLink.classList.remove('active');
        }
    }

    const activateArticle = function (link) {
        const articleId = link.getAttribute('href');
        const article = document.querySelector(articleId);
        article.classList.add('active');
    }

    handle(this);
}