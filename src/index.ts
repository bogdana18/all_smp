import { Article } from './content/Article';
import { Versioned } from './version/Versioned';
import { createVersion } from './version/VersionControl';
import { articleValidator } from './validation/ArticleValidator';

const initialArticle: Versioned<Article> = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  status: 'published',
  title: 'The main part',
  body: 'main part of first article',
  author: 'Author 228',
  tags: ['TypeScript', 'DUIKT'],
  version: 2,
  previousVersions: []
};

// create new version
const updatedArticle = createVersion(initialArticle);

// validate article
const validationResult = articleValidator.validate(updatedArticle);

console.log('New Version:', updatedArticle);
console.log('Validation Result:', validationResult);