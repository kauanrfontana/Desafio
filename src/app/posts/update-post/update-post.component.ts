import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { Post } from 'src/app/interfaces/post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit{

  nameControl = new FormControl('', [Validators.required]);
  titleControl = new FormControl('', [Validators.required]);
  bodyControl = new FormControl('', [Validators.required]);

  postData: Post ={
    "user_id": null,
    "title": '',
    "body": ''
  };


  ngOnInit(): void {

  }

}
