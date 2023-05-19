import { Component, EventEmitter, Output } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { Post } from 'src/app/interfaces/post';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @Output() exitCreate = new EventEmitter();
  @Output() eventMsgCreate = new EventEmitter();

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nameControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);


  data: Post ={
    "name": "",
    "email": "",
    "gender": "",
    "status": ""
  };
  

  constructor(private postsService: PostsService){}

  newPost(){
    this.data.status = 'active';
    this.postsService.createPost(this.data).subscribe(
      () => {
        console.log('Post cadastrado com sucesso');
        this.eventMsgCreate.emit("success");
        this.exitCreate.emit();
        // Lógica adicional após a exclusão do usuário
      },
      (error) => {
        console.error('Erro ao cadastrar post', error);
        let erro: string;
        if(error.ok === false){
          erro = "cadastrado inválido!"
        }
        this.eventMsgCreate.emit(erro);
        this.exitCreate.emit();
  
      }
    );
  }

  getErrorMessage(campo) {
    if (campo.hasError('required')) {
      return 'Campo obrigatório!';
    } else if(campo.hasError('email')){
      return 'email inválido';
    }

    return '';
  }

}
