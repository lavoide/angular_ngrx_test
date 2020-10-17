import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  roles = ['User', 'Admin', 'Owner'];
  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.setItem('role', 'user');
  }
  onOptionsSelected(value){
    localStorage.setItem('role', value.toLowerCase());
    this.router.navigate(['/'])
  }
}
