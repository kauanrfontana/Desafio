import { Component, OnInit, EventEmitter } from '@angular/core';
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
  loading: boolean = false;

  toFilterId = '';
  filterVisible = false;
  filtered = false;

  modalDelete = false;
  msgdel = false

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status'];

  constructor(private usersService: UsersService){}

  async ngOnInit(){
    this.loading = true;
    await firstValueFrom(this.dados = this.usersService.getUsers())
        .then(() => {this.loading = !this.loading})
        .catch(()=>{
          alert('error')
      })
  }

  async reload(){
        this.dados = null;
        this.loading = true;
        await setTimeout(() => {
           firstValueFrom(this.dados = this.usersService.getUsers())
            .then(() => {this.loading = !this.loading});
        }, 1000);
        
  }

  async paginate(add = null){
    this.dados = null;
    this.loading = true;

    if (add != null && add != 'first'){
      this.pages += parseInt(add);
    } else if(add = 'first'){
      this.pages = 1;
    }

    this.inFirstPage = this.pages === 1;
    this.inLastPage = this.pages === this.maxPage;

    await setTimeout(() => {
      firstValueFrom(this.dados = this.usersService.getPagination(this.pages, this.per_page))
        .then(() => {this.loading = !this.loading})
        .catch(()=>{
          alert('error')
      });
    }, 100);
  }

  async filter(toFilterId:string){
    this.dados = null
    this.loading = true;

    let data = await firstValueFrom(await this.usersService.getFiltered(toFilterId));

    setTimeout(() => {
      this.loading = !this.loading;
      this.dados = [data];
      this.filtered = true;
    }, 1000);
  }

  async clearFilter(){
    this.filtered = false;
    this.dados = null;
    this.loading = true;

    await setTimeout(() => {
      firstValueFrom(this.dados = this.usersService.getUsers())
        .then(() => {this.loading = !this.loading})
        .catch(()=>{
          alert('error')
      });
    }, 100);
  }

  showFilter(){
    this.filterVisible = this.filterVisible == false;
  }

  showModalDelete(){
    this.modalDelete = this.modalDelete == false;
  }

  deleteMsg(result: string){
    console.log('Dados recebidos:', result);
    
  }
  
}
