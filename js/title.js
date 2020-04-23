'use strict';

const addEventListenerToTitleLinks = function () {
  for (let link of document.querySelectorAll('.titles a')) {
    link.addEventListener('click', titleClickHandler);
  }
};

const generateTitleLinks = function (customSelector = '') {
  const SELECTOR = {
    ARTICLE: '.post',
    TITLE: '.post-title',
    TITLE_LIST: '.titles'
  };

  let links = '';
  for (let article of document.querySelectorAll(SELECTOR.ARTICLE + customSelector)) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(SELECTOR.TITLE).innerHTML;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    links += linkHTML;
  }

  document.querySelector(SELECTOR.TITLE_LIST).innerHTML = links;
  addEventListenerToTitleLinks();
};

const changeActiveElement = (element, elementSelector) => {
  for (let activeLink of document.querySelectorAll(elementSelector)) {
    activeLink.classList.remove('active');
  }
  element.classList.add('active');
};

const titleClickHandler = function (event) {
  const SELECTOR = {
    ARTICLE: 'article.active',
    TITLELINK: '.titles a.active',
  };

  event.preventDefault();
  changeActiveElement(this, SELECTOR.TITLELINK);
  const articleId = this.getAttribute('href');
  const article = document.querySelector(articleId);
  changeActiveElement(article, SELECTOR.ARTICLE);
};
