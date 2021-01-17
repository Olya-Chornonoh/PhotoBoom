import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;
  posts: Post[];

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.api.getUser(params.id).subscribe(user => this.user = user);
      this.api.getPostsForUser(params.id).subscribe(paged => this.posts = paged.rows);
    });
  }

}
