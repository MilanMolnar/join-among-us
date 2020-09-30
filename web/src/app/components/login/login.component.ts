import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  constructor(private http: HttpClient) {}

  public error = null;

  onSubmit() {
    return this.http
      .post('http://localhost:8000/api/login', this.form)
      .subscribe(
        (data) => console.log(data),
        (error) => this.handleError(error)
      );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {}
}
