import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostViewComponent } from 'src/app/dialogs/post-view/post-view.component';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() item: Post;
  
  apiUrl = environment.apiUrl;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  like() {

  }

  openComments() {
    const dialogRef = this.dialog.open(PostViewComponent, {
      width: '400px',
      data: {
        post: this.item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
