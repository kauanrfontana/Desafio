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
  @Output() eventMsgCreate = new EventEmitter();

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  name: string;
  email: string;
  gender: string;
  status: string;

  data: User;

  constructor(private usersService: UsersService){}

  newUser(){
    this.usersService.createUser(this.data)
  }

}
