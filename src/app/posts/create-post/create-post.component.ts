import { Component, EventEmitter, Output, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  @Output() exitCreate = new EventEmitter();
  @Output() eventMsgCreate = new EventEmitter();

  nameControl = new FormControl('', [Validators.required]);
  titleControl = new FormControl('', [Validators.required]);
  bodyControl = new FormControl('', [Validators.required]);
  


  postData: Post ={
    "user_id": null,
    "title": '',
    "body": ''
  };
  
  userData: User ={
    "name": "",
    "email": "",
    "gender": "",
    "status": ""
  };
  userId: string
  postUsername: string

  constructor(private postsService: PostsService, private usersService: UsersService){}

  newPost(){
    
    this.postsService.createPost(this.postData).subscribe(
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
    } 

    return '';
  }

  async getUserData(userName){
    try {
      let data  = await this.usersService.getFiltered(userName).toPromise();
      this.userId = data[0].id;
      this.userData.name = data[0].name;
      this.userData.email = data[0].email;
      this.userData.gender = data[0].gender;
      this.userData.status = data[0].status;
      this.postData.user_id = parseInt(this.userId)
      if(this.postUsername == ""){
        this.userId = '';
        this.userData.name = '';
        this.userData.email = '';
        this.userData.gender = '';
        this.userData.status = '';
        this.postData.user_id = null
      }
    } catch (error) {
      console.log('erro')
    }
    
  }

}
