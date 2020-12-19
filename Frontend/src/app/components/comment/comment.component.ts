import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

import {Comment} from '../../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() item: Comment;

  @Output() commentDelete = new EventEmitter<boolean>();

  canDelete = false;

  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    this.canDelete = this.item.User.id.toString() === this.auth.getUserId()
  }

  deleteComment() {
    this.api.deleteComment(this.item.Post.id, this.item.id).subscribe(res => {
      this.commentDelete.emit(true);
      console.log(res);
    });
  }  
}
