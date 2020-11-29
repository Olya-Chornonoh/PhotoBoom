import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  posts: Post[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllPosts().subscribe(paged => {
      this.posts = paged.rows;
    });
  }

}
