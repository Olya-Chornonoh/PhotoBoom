import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  loginSearch = new FormControl('', [
    Validators.required,
  ]);

  users: User[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  searchUsers() {
    this.api.searchUsers(this.loginSearch.value).subscribe(paged => {
      this.users = paged.rows;
    });
  }
}
