'use strict';

const generateAuthors = () => {
  let allAuthors = [];
  for (let article of document.querySelectorAll('article')) {
    const author = article.getAttribute('data-author');
    const title = article.querySelector('.post-title');
    const htmlAuthor = `<a class="post-author" href="#author-${author}">By ${author}<a/>`;
    title.insertAdjacentHTML('afterend', htmlAuthor);

    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  let authorHtml = '';
  const minMaxPair = calculateMinMaxPair(allAuthors);
  for (let author in allAuthors) {
    const authorSize = calculateSizeClass(allAuthors[author], minMaxPair, 3);
    authorHtml += `<li><a href="#author-${author}"><span class="author-name author-size-${authorSize}">${author} (${allAuthors[author]})</span></a></li>\n`;
  }

  const authors = document.querySelector('.authors');
  authors.insertAdjacentHTML('beforeend', authorHtml);

  addClickListenersToAuthors();
};

const addClickListenersToAuthors = () => {
  for (let author of document.querySelectorAll('a[href^="#author-"]')) {
    author.addEventListener('click', authorClickHandler);
  }
};

const authorClickHandler = function (event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const author = href.replace('#author-', '');
  generateTitleLinks(`[data-author="${author}"]`);
};

