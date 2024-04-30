import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { ArticleApiClientService, ArticlesPaginatedResponseData } from '../../services';
import { AxiosResponse } from 'axios';
import { MarkdownComponent } from 'ngx-markdown';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { MatTabsModule } from '@angular/material/tabs';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'blogify-article',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    MatSidenavModule,
    RouterLink,
    MatIconModule,
    NgIf,
    NgClass,
    NgFor,
    MatButtonModule,
    MatProgressBarModule,
    CdkScrollable,
    MatTabsModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent implements OnInit {
  article: ArticlesPaginatedResponseData;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly articleApiService: ArticleApiClientService,
  ) {}

  private async navigateBack() {
    await this.router.navigate(['']);
  }

  asDateString(raw: string): string {
    return new Date(raw).toLocaleDateString();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (paramsMap: ParamMap) => {
      const identifier: string = paramsMap.get('identifier');

      if (!identifier) {
        await this.navigateBack();
      }
      try {
        const response: ArticlesPaginatedResponseData =
          await lastValueFrom(this.articleApiService.getArticle(identifier));

        if (response) {
          this.article = response;
        }
      } catch (error: unknown) {
        await this.navigateBack();
      }
    });
  }
}
