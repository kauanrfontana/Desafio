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

  postId: any

  constructor(private postsService: PostsService, private router: Router, private route: ActivatedRoute ){}


  async ngOnInit(){
    try {
      this.route.params.subscribe(params => {
        this.postId = params['id'];
        console.log(this.postId, params['id'])
      });
      if(this.postId){
        this.postsService.filterPost(this.postId).subscribe(
          (data) => {
            this.postData.title = data.title;
            this.postData.body = data.body;
            this.postData.user_id = data.user_id;
          }
        )
      }else{
        throw new Error("Edit ID não está definido");
      }

    } catch (error) {
      this.exit()
      alert(error)
    }
  }

  UpdatePost(){

    this.postsService.updatePost(this.postId, this.postData).subscribe(
      () => {
        console.log('Post editado com sucesso');
        this.exit()
      },
      (error) => {
        console.error('Erro ao editar post', error);
        let erro: string;
        if(error.ok === false){
          erro = "edição inválida!"
        }
        alert(erro)
        this.exit()

      }
    );
  }

  getErrorMessage(campo) {
    if (campo.hasError('required')) {
      return 'Campo obrigatório!';
    }

    return '';
  }

  exit(){
    this.router.navigate(['/posts'])
  }

}
