import { Routes } from '@angular/router';
import { ArticleComponent, ArticlesComponent } from './components';
import { LayoutComponent } from './fuse/layout/layout.component';
import { AuthorComponent } from './components/author/author.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'article/:identifier',
        component: ArticleComponent,
      },
      {
        path: 'articles',
        component: ArticlesComponent,
      },
      {
        path: 'author/:id',
        component: AuthorComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
