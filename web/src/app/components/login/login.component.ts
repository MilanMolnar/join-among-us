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

  onSubmit() {
    return this.http.post('http//localhost:8000', this.form).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
  }

  ngOnInit() {}
}
