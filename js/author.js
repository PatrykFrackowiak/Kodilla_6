'use strict';

const generateAuthors = () => {
  for (let article of document.querySelectorAll('article')) {
    const author = article.getAttribute('data-author');
    const title = article.querySelector('.post-title');
    const htmlAuthor = `<a class="post-author" href="#${author}">By ${author}<a/>`;
    title.insertAdjacentHTML('afterend', htmlAuthor);
  }
  addClickListenersToAuthors();
};

const authorClickHandler = function(event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const author = href.replace('#', '');
  generateTitleLinks(`[data-author="${author}"]`);
};

const addClickListenersToAuthors = () => {
  for (let author of document.querySelectorAll('.post-author')) {
    author.addEventListener('click', authorClickHandler);
  }
};
