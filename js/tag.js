'use strict';

const generateTags = () => {
  let allTags = [];
  for (let article of document.querySelectorAll('article')) {
    let tagsWrapper = article.querySelector('.post-tags .list');
    let tagsWrapperHtml = '';
    for (let tag of article.getAttribute('data-tags').split(' ')) {
      tagsWrapperHtml += templates.tagLink({ tag: tag });
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = tagsWrapperHtml;
  }

  const tagList = document.querySelector('.tags');
  let allTagsData = { tags: []};
  const tagsParams = calculateMinMaxPair(allTags);
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: "tag-size-" + calculateSizeClass(allTags[tag], tagsParams, 5)
    });
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);

  addClickListenersToTags();
};

const addClickListenersToTags = () => {
  for (let link of document.querySelectorAll('a[href^="#tag-"]')) {
    link.addEventListener('click', tagClickHandler);
  }
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

