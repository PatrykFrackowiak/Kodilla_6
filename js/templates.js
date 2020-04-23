'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-cloud-tag-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-cloud-author-link').innerHTML)
};
