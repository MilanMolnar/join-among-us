import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { TokenService } from 'src/app/services/token.service';
import { JarwisService } from '../../services/jarwis.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private Jarwis: JarwisService, private Token: TokenService, private router: Router, private Auth: AuthService) { }

  error = {
    email: null,
    name: null,
    password: null,
  };

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null
  };


  onSubmit() {
    this.Jarwis.signup(this.form).subscribe(
      (data) => this.handleResponse(data),
      (error) => this.handleError(error)

    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    error.name = this.error.name;
    error.email = this.error.email;
    error.password = this.error.password;
  }

  ngOnInit() {
  }

}
