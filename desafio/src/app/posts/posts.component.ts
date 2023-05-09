import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  dados!: any;

  displayedColumns: string[] = ['id', 'user_id', 'title', 'body'];

  constructor(private postsService: PostsService){}

  ngOnInit(): void  {
    this.dados = this.postsService.getPosts();
  }

  
}



