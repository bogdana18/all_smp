"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VersionControl_1 = require("./version/VersionControl");
var ArticleValidator_1 = require("./validation/ArticleValidator");
var initialArticle = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft',
    title: 'First Article',
    body: 'This is the body of the first article',
    author: 'Author',
    tags: ['TypeScript', 'Programming'],
    version: 1,
    previousVersions: []
};
// create new version
var updatedArticle = (0, VersionControl_1.createVersion)(initialArticle);
// validate article
var validationResult = ArticleValidator_1.articleValidator.validate(updatedArticle);
console.log('New Version:', updatedArticle);
console.log('Validation Result:', validationResult);
