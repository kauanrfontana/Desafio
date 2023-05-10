import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  dados: any;
  per_page = '10';
  pages = 1;
  inFirstPage = true;

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  constructor(private usersService: UsersService){}

  async ngOnInit(){
    await firstValueFrom(this.dados = this.usersService.getUsers())
  }

  async paginate(add = null){
    if (add != null){
      this.pages += parseInt(add);
      this.inFirstPage = false
    }

    if (this.pages == 1){
      this.inFirstPage = true
    }

    await firstValueFrom(this.dados = this.usersService.getPagination(this.pages, this.per_page))
    .then((data) => {
      console.log(data)
    })
    .catch(()=>{
      alert('error')
    })
  }


  
}
