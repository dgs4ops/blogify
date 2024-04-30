import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MarkdownComponent } from 'ngx-markdown';
import { ArticleApiClientService } from '../../services';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MarkdownComponent,
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
})
export class ConfirmationDialogComponent {
  constructor(
    private readonly articleApiClientService: ArticleApiClientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    data.id;
  }
  deleteArticle() {
    this.articleApiClientService.deleteArticle(this.data.id).subscribe(() => window.location.reload());
  }
}
