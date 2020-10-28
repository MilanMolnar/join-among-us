import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-Snotify';
import { JarwisService } from 'src/app/services/jarwis.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})

export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  }

  constructor(
    private Jarvis: JarwisService,
    private notify: SnotifyService,
    private Notify: SnotifyService,
    ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.Notify.info('Wait a sec.. Let me think...' , {timeout: 5000});
    this.Jarvis.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.Notify.success(res.success, {timeout: 0});
    console.log(res);
    this.form.email = null;
  }

}
