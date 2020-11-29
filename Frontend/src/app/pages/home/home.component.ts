import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  posts: Post[];

  constructor(private auth: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      this.user = user;
      this.api.getPostsForUser(this.user.id).subscribe(paged => this.posts = paged.rows);
    });
  }
}
