import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleApiClientService, ArticlesPaginatedResponseData } from '../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'blogify-article-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './article-edit-dialog.component.html',
  styleUrl: './article-edit-dialog.component.css',
})
export class ArticleEditDialogComponent implements OnInit {
  untypedFormGroup: UntypedFormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private readonly data: ArticlesPaginatedResponseData & unknown,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly articleApiClientService: ArticleApiClientService,
  ) {}

  async ngOnInit() {
    this.untypedFormGroup = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      introduction: [this.data.introduction, Validators.required],
      content: [this.data.content, Validators.required],
    });
  }

  async submit(): Promise<void> {
    const { id, title, introduction, content } = this.data;

    this.articleApiClientService.updateArticle({
      id,
      title, introduction, content
    }).subscribe(() => window.location.reload());
  }
}
