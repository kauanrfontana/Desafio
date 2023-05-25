import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  @Output() exitUpdate = new EventEmitter();
  @Output() eventMsgUpdate = new EventEmitter();

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nameControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);

  data: User ={
    "name": "",
    "email": "",
    "gender": "",
    "status": ""
  };

  userId: string

  constructor(private usersService: UsersService){}

  async ngOnInit(){
    this.usersService.getUserName(this.userId).subscribe(
      (data) => {
        this.data.name = data.name;
        this.data.email = data.email;
        this.data.gender = data.gender;
        this.data.status = data.status;
      }
    )
  }
  newUser(){
    this.data.status = 'active';
    this.usersService.createUser(this.data).subscribe(
      () => {
        console.log('Usuário editado com sucesso');
        this.eventMsgUpdate.emit("success");
        this.exitUpdate.emit();
        // Lógica adicional após a exclusão do usuário
      },
      (error) => {
        console.error('Erro ao editar usuário', error);
        let erro: string;
        if(error.ok === false){
          erro = "erro ao cadastrar usuário!"
        }
        this.eventMsgUpdate.emit(erro);
        this.exitUpdate.emit();
  
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
