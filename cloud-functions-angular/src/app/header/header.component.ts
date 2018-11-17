import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

const PROFILE_PLACEHOLDER_IMAGE_URL = '/assets/images/profile_placeholder.png';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  profilePicStyles: {};
  user: Observable<firebase.User>;

  constructor(public loginService: LoginService) {
    this.user = this.loginService.user;

    this.user.subscribe((user: firebase.User) => {
      if (user) { // User is signed in!
        this.profilePicStyles = {
          'background-image':  `url(${user.photoURL})`
        };
      } else { // User is signed out!
        this.profilePicStyles = {
          'background-image':  PROFILE_PLACEHOLDER_IMAGE_URL
        };
      }
    });
  }

  login() {
    this.loginService.login();
    this.user = this.loginService.user;
  }

  logout() {
    this.loginService.logout();
    this.user = null;
  }

}
