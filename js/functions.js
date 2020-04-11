'use strict'


function generateTitleLinks() {
    const selectors = {
        article: '.post',
        title: '.post-title',
        titleList: '.titles'
    };

    const generate = function () {
        const generatedLinks = generateNewLinks();
        document.querySelector(selectors.titleList).innerHTML = generatedLinks;
        addEventListenerToTitleLinks();
    }

    const generateNewLinks = function() {
        let links = '';
        for (let article of document.querySelectorAll(selectors.article)) {
            const articleId = article.getAttribute('id');
            const articleTitle = article.querySelector(selectors.title).innerHTML;
            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            links += linkHTML;
        }
        return links;
    }

    generate();
}

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

