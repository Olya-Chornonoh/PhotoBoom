import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  comment = new FormControl('', [
    Validators.required,
  ]);
  @Input() postId: number;
  @Output() commentAdd = new EventEmitter<boolean>();
  
  constructor(
    private api: ApiService) {
    }

  ngOnInit(): void {
  }

  onSubmit() {
    this.api.createComment(this.postId, this.comment.value).subscribe(comment => {
      this.comment.setValue('');
      console.log(comment);
      this.commentAdd.emit(true);
    });
  }

  onCancel() {
    this.comment.setValue('');
    this.commentAdd.emit(false);
  }
}
