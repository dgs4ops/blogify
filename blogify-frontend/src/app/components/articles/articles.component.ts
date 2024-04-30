import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/overlay';

import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  ArticleApiClientService,
  ArticlesPaginatedResponse,
  ArticlesPaginatedResponseData,
} from '../../services';
import { MarkdownComponent } from 'ngx-markdown';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'blogify-articles',
  standalone: true,
  imports: [
    CommonModule,
    CdkScrollable,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    NgFor,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    NgIf,
    NgClass,
    MatTooltipModule,
    MatProgressBarModule,
    MatButtonModule,
    RouterLink,
    MarkdownComponent,
    MatListModule,
    MatPaginatorModule,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  articles: ArticlesPaginatedResponse;

  defaultSelectedDirection: string =
    localStorage.getItem('defaultSelectedDirection') ?? 'desc';

  articlesPerPage: number =
    Number(localStorage.getItem('articlesPerPage')) ?? 20; // take query

  constructor(
    private readonly articleApiClientService: ArticleApiClientService,
    private router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  async ngOnInit(
    direction: string = this.defaultSelectedDirection,
  ): Promise<void> {
    this.activatedRoute.queryParamMap.subscribe(async (paramsMap: ParamMap) => {
      try {
        const page: number = parseInt(paramsMap.get('page')) || 1;
        const take: number =
          parseInt(localStorage.getItem('articlesPerPage')) || 20;

        const response: ArticlesPaginatedResponse =
          await lastValueFrom(this.articleApiClientService.getArticles({ direction, page, take }));

        if (response.data) {
          this.articles = response;
        }
      } catch (error: unknown) {
        await this.router.navigate(['/articles']);
      }
    });
  }

  async update(value: any) {
    localStorage.setItem('defaultSelectedDirection', value);
    await this.ngOnInit(value);
  }

  async handlePageSwitch(event: any) {
    console.log({ event });

    localStorage.setItem('articlesPerPage', String(event.pageSize));
    this.ngOnInit();
    await this.router.navigate([`/articles`], {
      queryParams: { page: event.pageIndex + 1 },
    });
  }

  async logButtonValue(event: any) {
    console.log(event);
    await this.router.navigate([`/article/${event}`]);
  }

  authorAndDate(article: ArticlesPaginatedResponseData) {
    return `${article.author.displayName}\n\n ${this.asDateString(article.createdAt)}`;
  }

  asDateString(raw: string): string {
    return new Date(raw).toLocaleDateString();
  }
}
