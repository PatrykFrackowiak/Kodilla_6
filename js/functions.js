'use strict';

const generateTags = () => {
  for (let article of document.querySelectorAll('article')) {
    let tagsWrapper = article.querySelector('.post-tags .list');
    let tagsWrapperHtml = '';
    for (let tag of article.getAttribute('data-tags').split(' ')) {
      tagsWrapperHtml += `<li><a href="#tag-${tag}">${tag}</a></li>\n`;
    }
    tagsWrapper.innerHTML = tagsWrapperHtml;
  }
  addClickListenersToTags();
};

const tagClickHandler = function (event) {
  event.preventDefault();
  const href = this.getAttribute('href');
  const tag = href.replace('#tag-', '');
  for (let activeTag of document.querySelectorAll('a.active[href^="#tag-"]')) {
    activeTag.classList.remove('active');
  }
  for (let foundTag of document.querySelectorAll(`a[href="#tag-${href}"]`)) {
    foundTag.classList.add('active');
  }
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = () => {
  for (let link of document.querySelectorAll('.post-tags a')) {
    link.addEventListener('click', tagClickHandler);
  }
  for (let link of document.querySelectorAll('.tags a')) {
    link.addEventListener('click', tagClickHandler);
  }
};

