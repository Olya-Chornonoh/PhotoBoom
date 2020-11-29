import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() item: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openUser() {
    this.router.navigate(['users', this.item.id]);
  }

}
