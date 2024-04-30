import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ArticleApiClientService, ArticlesPaginatedResponseData } from '../../services';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css',
})
export class EntryComponent implements OnInit {
  entryForm: UntypedFormGroup;
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private readonly articleApiClientService: ArticleApiClientService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    private readonly data: ArticlesPaginatedResponseData & unknown,
  ) {}

  ngOnInit() {
    this.entryForm = this._formBuilder.group({
      title: ['', Validators.required],
      introduction: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  entry() {
    const { title, introduction, content } = this.entryForm.value;

    this.articleApiClientService.createArticle({
      title, introduction, content,
    }).subscribe(() => window.location.reload())
  }
}
