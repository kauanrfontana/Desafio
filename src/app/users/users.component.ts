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

  userName = '';
  filterVisible = false;
  filtered = false;

  modalDelete = false;
  msgdel = false;
  deleteError = "";
  hideModal = false;

  modalCreate = false;

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

  async filter(userName:string){
    this.dados = null
    this.loading = true;

    setTimeout(() => {
      firstValueFrom(this.dados = this.usersService.getFiltered(userName))
        .then((data) => {
          console.log(data.length)
          this.loading = !this.loading; 
          this.filtered = true;
        })
        .catch(()=>{
          alert('error')
      });
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

  showModalCreate(){
    this.modalCreate = this.modalCreate == false;
  }

  deleteMsg(result: string){
    if(result === 'success'){
      this.msgdel = !this.msgdel;
    } else{
      this.msgdel = !this.msgdel;
      this.deleteError = result;
    }

    setTimeout(() => {
      this.msgdel = false
    }, 5000);
  }
  
}
