import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {
  @Output() exitCreate = new EventEmitter();
  @Output() eventMsgCreate = new EventEmitter();

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  nameControl = new FormControl('', [Validators.required]);
  genderControl = new FormControl('', [Validators.required]);


  data: User ={
    "name": "",
    "email": "",
    "gender": "",
    "status": ""
  };
  

  constructor(private usersService: UsersService){}

  newUser(){
    this.data.status = 'active';
    this.usersService.createUser(this.data).subscribe(
      () => {
        console.log('Usuário cadastrado com sucesso');
        this.eventMsgCreate.emit("success");
        this.exitCreate.emit();
        // Lógica adicional após a exclusão do usuário
      },
      (error) => {
        console.error('Erro ao cadastrar usuário', error);
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
