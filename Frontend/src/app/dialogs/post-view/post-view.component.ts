import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  apiUrl = environment.apiUrl;

  comments: Comment[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { post: Post }, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllComments(this.data.post.id).subscribe(paged => {
      this.comments = paged.rows;
    });
  }

}
