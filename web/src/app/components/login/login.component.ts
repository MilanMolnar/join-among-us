import { Component, OnInit } from '@angular/core';
import {JarwisService} from '../../services/jarwis.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null,
  };
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService
    ) {}

  public error = null;

  onSubmit() {
      this.Jarwis.login(this.form).subscribe(
        (data) => this.handleResponse(data),
        (error) => this.handleError(error)
      );
  }
  handleResponse(data){
      this.Token.handle(data.access_token)
  }


  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {}
}
