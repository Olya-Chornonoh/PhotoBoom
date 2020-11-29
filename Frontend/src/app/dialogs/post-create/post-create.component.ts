import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  selectedFile: any;
  description = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    public dialogRef: MatDialogRef<PostCreateComponent>,
    private api: ApiService) { }

  ngOnInit(): void {
  }

  selectFile(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('photo', this.selectedFile);
    formData.append('description', this.description.value);

    this.api.createPost(formData).subscribe(post => {
      console.log(post);
      this.dialogRef.close(post);
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
