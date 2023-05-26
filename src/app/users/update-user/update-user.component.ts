import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { User } from 'src/app/interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nameControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);
  statusControl = new FormControl('', [Validators.required]);

  data: User ={
    "name": "",
    "email": "",
    "gender": "",
    "status": ""
  };

  userId: any

  constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router ){}

  async ngOnInit(){
    try {
      this.route.params.subscribe(params => {
        this.userId = params['id'];
      });
      if(this.userId){
        this.usersService.getUserName(this.userId).subscribe(
          (data) => {
            this.data.name = data.name;
            this.data.email = data.email;
            this.data.gender = data.gender;
            this.data.status = data.status;
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
  updateUser(){
    this.usersService.updateUser(this.userId, this.data).subscribe(
      () => {
        console.log('Usuário editado com sucesso');
        this.exit();
        // Lógica adicional após a exclusão do usuário
      },
      (error) => {
        console.error('Erro ao editar usuário', error);
        let erro: string;
        if(error.ok === false){
          erro = "erro ao cadastrar usuário!"
        }
        alert(erro)
        this.exit();

      }
    );
  }

  exit(){
    this.router.navigate(['/']);
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
