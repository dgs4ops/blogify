import { Injectable } from '@nestjs/common';
import { App, initializeApp, cert } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAdminService {
  private readonly firebaseApp: App;

  private readonly auth: Auth;
  constructor() {
    try {
      this.firebaseApp = initializeApp({
        credential: cert('gcp_keyfile.json'),
      });
      this.auth = getAuth(this.firebaseApp);
    } catch (error: unknown) {}
  }

  async getDecodedToken(token: string) {
    try {
      return await this.auth.verifyIdToken(token, true);
    } catch (error: unknown) {
      return false;
    }
  }
}
