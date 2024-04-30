import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseAlertComponent } from '@fuse/components/alert';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  firebaseApp: FirebaseApp = inject(FirebaseApp);

  signInForm: UntypedFormGroup;

  constructor(
    private readonly untypedFormBuilder: UntypedFormBuilder,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.untypedFormBuilder.group({
      email: ['test@hotmail.com', Validators.required],
      password: ['Hallo.123', Validators.required],
    });
  }

  async signIn() {
    const { email, password } = this.signInForm.value;

    try {
      const response = await signInWithEmailAndPassword(
        getAuth(this.firebaseApp),
        email,
        password,
      );

      if (response.user) {
        localStorage.setItem('accessToken', response.user['accessToken']);
        await this.router.navigate([`/author/me`]);
      }
    } catch (error: unknown) {
      await this.router.navigate(['login']);
    }
  }
}
