import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/images/profile_placeholder.png';

@Injectable()
export class LoginService {
    private _user: Observable<firebase.User>;
    private _currentUser: firebase.User;

    constructor(public afAuth: AngularFireAuth) {
        this._user = afAuth.authState;
    }

    login() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((credentials) => {
            // TODO add to database credentials.user
        });
    }

    logout() {
      this.afAuth.auth.signOut();
    }

    get user(): Observable<firebase.User> {
        return this._user;
    }

    get currentUser(): firebase.User {
        return this._currentUser;
    }
}
