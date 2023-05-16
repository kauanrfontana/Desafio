import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  dados: any = [];
  per_page = '10';
  pages = 1;
  inFirstPage = true;
  inLastPage = false;
  maxPage: number = 166;

  toFilterId = '';
  filterVisible = false;
  filtered = false;

  modalDelete = false;

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  constructor(private usersService: UsersService){}

  async ngOnInit(){
    await firstValueFrom(this.dados = this.usersService.getUsers())
      .catch(()=>{
        alert('error')
      })
  }

  async paginate(add = null){
    if (add != null && add != 'first'){
      this.pages += parseInt(add);
    } else if(add = 'first'){
      this.pages = 1;
    }

    if (this.pages == this.maxPage){
      this.inLastPage = true
    } else{
      this.inLastPage = false
    }

    if (this.pages == 1){
      this.inFirstPage = true
    } else{
      this.inFirstPage = false
    }

    await firstValueFrom(this.dados = this.usersService.getPagination(this.pages, this.per_page))
      .catch(()=>{
        alert('error')
      })
  }

  async filter(toFilterId:string){
    let data = await firstValueFrom(await this.usersService.getFiltered(toFilterId));
    this.dados = [data];
    this.filtered = true;
  }

  async clearFilter(){
    this.filtered = false;
    await firstValueFrom(this.dados = this.usersService.getUsers())
      .catch(()=>{
        alert('error')
      });
  }

  showFilter(){
    if(this.filterVisible == false){
      this.filterVisible = true
    } else{
      this.filterVisible = false
    }
  }

  showModalDelete(){
    if(this.modalDelete == false){
      this.modalDelete = true
    } else{
      this.modalDelete = false
    }
  }


  
}
