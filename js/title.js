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

  let links = [];
  for (let article of document.querySelectorAll(SELECTOR.ARTICLE + customSelector)) {
    links.push({
      id: article.getAttribute('id'),
      title: article.querySelector(SELECTOR.TITLE).innerHTML
    });
  }

  document.querySelector(SELECTOR.TITLE_LIST).innerHTML = templates.articleLink({links: links});
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
