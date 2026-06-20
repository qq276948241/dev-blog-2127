import type { Article } from '../../types';
import { frontendArticles } from './frontend';
import { backendArticles } from './backend';
import { databaseArticles } from './database';
import { devopsArticles } from './devops';
import { algorithmArticles } from './algorithm';
import { toolsArticles } from './tools';

export const articles: Article[] = [
  ...frontendArticles,
  ...backendArticles,
  ...databaseArticles,
  ...devopsArticles,
  ...algorithmArticles,
  ...toolsArticles,
];

export * from './frontend';
export * from './backend';
export * from './database';
export * from './devops';
export * from './algorithm';
export * from './tools';
