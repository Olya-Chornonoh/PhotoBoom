import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostCreateComponent } from 'src/app/dialogs/post-create/post-create.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    private api: ApiService) { }

  ngOnInit(): void {
    if (!this.auth.getAccessToken()) {
      this.router.navigate(['/signin']);
    } else {
      this.api.getAuthorizedUser().subscribe(user => {
        this.auth.setUserId(user.id.toString());
      });
    }
  }

  logOut() {
    this.auth.deleteAccessToken();
    this.auth.deleteUserId();
    this.router.navigate(['signin']);
  }

  createPost() {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
