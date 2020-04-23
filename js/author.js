'use strict';

const generateAuthors = () => {
  let allAuthors = [];
  for (let article of document.querySelectorAll('article')) {
    const author = article.getAttribute('data-author');
    const htmlAuthor = templates.authorLink({ author: author });
    const title = article.querySelector('.post-title');
    title.insertAdjacentHTML('afterend', htmlAuthor);

    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }

  let authorsData = { authors: [] };
  const minMaxPair = calculateMinMaxPair(allAuthors);
  for (let author in allAuthors) {
    authorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: "author-size-" + calculateSizeClass(allAuthors[author], minMaxPair, 3)
    })
  }

  const authors = document.querySelector('.authors');
  authors.innerHTML = templates.authorCloudLink(authorsData);

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

