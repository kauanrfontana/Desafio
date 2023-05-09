import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  dados!: any;

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  constructor(private usersService: UsersService){}

  ngOnInit(): void  {
    this.dados = this.usersService.getUsers();
  }

  
}
