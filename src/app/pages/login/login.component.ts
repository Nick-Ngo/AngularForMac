import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.spinner.show();
    this.authService.login();
  }
}
