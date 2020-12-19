import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { PostLike } from 'src/app/models/post-like';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  apiUrl = environment.apiUrl;

  comments: Comment[];
  userLiked = false;
  likeId: number;
  likes: PostLike[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { post: Post },
  private dialog: MatDialog, private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.initComments();
    this.initLikes();
  }

  initComments() {
    this.api.getAllComments(this.data.post.id).subscribe(paged => {
      this.comments = paged.rows;
    });
  }

  initLikes() {
    this.api.getLikes(this.data.post.id).subscribe(paged => {
      paged.rows.forEach(like => {
        if (like.user_id.toString() == this.auth.getUserId()) {
          this.likeId = like.id;
          this.userLiked = true;
        }
      });
    });
  }

  onCommentAdd(add: boolean) {
    if (add) {
      this.data.post.comment_count += 1;
      this.initComments();
    }
  }

  onCommentDelete(deleted: boolean) {
    if (deleted) {
      this.data.post.comment_count -= 1;
      this.initComments();
    }
  }

  likeToggle() {
    if (this.userLiked) {
      this.api.deleteLike(this.data.post.id, this.likeId).subscribe(res => {
        this.userLiked = false;
        this.data.post.likes_count -= 1;
        this.initLikes();
      });
    } else {
      this.api.createLike(this.data.post.id).subscribe(res => {
        this.userLiked = true;
        this.likeId = res.id;
        this.data.post.likes_count += 1;
      });
    }
  }
}
