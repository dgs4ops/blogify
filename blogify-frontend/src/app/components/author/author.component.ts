import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ArticleApiClientService,
  AuthorApiClientService,
  AuthorMeResponse,
  ArticlesPaginatedResponse, ArticlesPaginatedResponseData,
} from '../../services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EntryComponent } from '../article-create-dialog/entry.component';
import { ArticleEditDialogComponent } from '../article-edit-dialog/article-edit-dialog.component';
import { ConfirmationDialogComponent } from '../delete-confirmation-dialog/confirmation-dialog.component';
import { CdkScrollable } from '@angular/cdk/overlay';
import { MarkdownComponent } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-author',
  standalone: true,
  imports: [
    CommonModule,
    CdkScrollable,
    MarkdownComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatPaginatorModule,
    MatSelectModule,
  ],
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
})
export class AuthorComponent implements OnInit {
  articles: ArticlesPaginatedResponse;

  author: AuthorMeResponse;

  defaultSelectedDirection: string =
    localStorage.getItem('defaultSelectedDirection') ?? 'desc';

  articlesPerPage: number =
    Number(localStorage.getItem('articlesPerPage')) ?? 20;

  constructor(
    private readonly articleApiClientService: ArticleApiClientService,
    private readonly authorApiClientService: AuthorApiClientService,
    private router: Router,
    public dialog: MatDialog,
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

        const response = await lastValueFrom(this.articleApiClientService.getAuthorArticles({ direction, page, take }));

        if (response) {
          this.articles = response;
        }
      } catch (error: unknown) {
        await this.router.navigate(['/articles/author']);
      }
    });

    this.authorApiClientService.getAuthor().subscribe((data) => this.author = data);
  }

  async update(value: any) {
    localStorage.setItem('defaultSelectedDirection', value);
    await this.ngOnInit(value);
  }

  async handlePageSwitch(event: any) {
    console.log({ event });

    localStorage.setItem('articlesPerPage', String(event.pageSize));
    this.ngOnInit();
    await this.router.navigate([`/author/:id`], {
      queryParams: { page: event.pageIndex + 1 },
    });
  }

  async logButtonValue(event: any) {
    console.log(event);
    await this.router.navigate([`/article/${event}`]);
  }

  openDialog() {
    console.log(this.author);
    this.dialog.open(EntryComponent, {
      height: '900px',
      width: '950px',
      data: {
        author: this.author.data.displayName,
      },
    });
  }

  editArticle(id: string) {
    const article = this.articles.data.find((article) => article.id == id);

    this.dialog.open(ArticleEditDialogComponent, {
      height: '900px',
      width: '950px',
      data: {
        id,
        ...article,
      },
    });
  }

  authorAndDate(article: ArticlesPaginatedResponseData) {
    return `${article.author.displayName}\n\n ${this.asDateString(article.createdAt)}`;
  }

  asDateString(raw: string): string {
    return new Date(raw).toLocaleDateString();
  }

  deleteArticle(id: string) {
    this.dialog.open(ConfirmationDialogComponent, {
      data: { id },
    });
  }
}
