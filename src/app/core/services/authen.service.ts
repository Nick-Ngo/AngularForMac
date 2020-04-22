import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SystemConstants } from '../../core/common/system.constants';
import { LoggedInUser } from '../domain/loggedin.user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenService {

  constructor(private _http: Http) { }

  login(username: string, password: string) {
    const body =
      'userName=' + encodeURIComponent(username) +
      '&password=' + encodeURIComponent(password) +
      '&grant_type=password';
    // create header
    const headers = new Headers();
    // add attr for head
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    const options = new RequestOptions({ headers: headers });
    // return post method
    return this._http.post(SystemConstants.BASE_API + '/api/oauth/token', body, options).map((response: Response) => {
      const user: LoggedInUser = response.json();
      if (user && user.access_token) {
        // remove current user 
        localStorage.removeItem(SystemConstants.CURRENT_USER);
        // add new current user 
        localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
      }
    });
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
  }

  isUserAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    if (user != null) {
      return true;
    } else {
      return false;
    }
  }

  getLoggedInUser(): LoggedInUser {
    let user: LoggedInUser;
    // check authen
    if (this.isUserAuthenticated()) {
      // get info user by localstorege
      const userData = JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER));
      user = new LoggedInUser(userData.access_token, userData.username, userData.fullName, userData.email, userData.avatar);
    } else {
      user = null;
    }
    return user;
  }
}
