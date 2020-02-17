import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  //selector: '[app-root]', select by attribute so in page: <div app-root></div>
  //selector: '.app-root', select by class so in page: <div class="app-root"></div>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    this.authService.autoLogin();
  }
}
