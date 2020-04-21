'use strict';


const generateTags = () => {
  let allTags = [];
  for (let article of document.querySelectorAll('article')) {
    let tagsWrapper = article.querySelector('.post-tags .list');
    let tagsWrapperHtml = '';
    for (let tag of article.getAttribute('data-tags').split(' ')) {
      tagsWrapperHtml += `<li><a href="#tag-${tag}">${tag}</a></li>\n`;
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = tagsWrapperHtml;
  }

  const tagList = document.querySelector('.tags');
  let allTagsHTML = '';
  const tagsParams = calculateTagsParams(allTags);
  for (let tag in allTags) {
    const tagSize = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += `<li><a href="#tag-${tag}" class="tag-size-${tagSize}">${tag} (${allTags[tag]})</a></li>\n`;
  }
  tagList.innerHTML = allTagsHTML;

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

const calculateTagsParams = (allTags) => {
  let min = Number.MAX_VALUE, max = 0;
  for (let occurences of Object.values(allTags)) {
    if (occurences < min) {
      min = occurences;
    }
    if (occurences > max) {
      max = occurences;
    }
  }
  return { 'min': min, 'max': max };
};

const calculateTagClass = (tag, tagParams) => {
  const numberOfBuckets = 5;
  const bucketSize = (tagParams['max'] - tagParams['min'] ) / (numberOfBuckets-1);
  return Math.floor((tag - tagParams['min']) / bucketSize) + 1;
};
