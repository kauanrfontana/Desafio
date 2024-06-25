import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Subscription, firstValueFrom  } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{

  // variáveis com influência na tabela
  beforeDados: any;
  dados: any = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'status', 'actions'];
  per_page = '10';
  pages = 1;
  inFirstPage = true;
  inLastPage = false;
  totalPages: number;
  loading: boolean = false;
  userName = '';

  // variáveis com influência no filtro
  filterVisible = false;
  filtered = false;

  // variáveis com influência no modal de delete
  modalDelete = false;
  msgdel = false;
  deleteError = "";


  // variáveis com influência no modal de create
  modalCreate = false;
  msgcreate = false;
  createError = "";

  // variáveis com influência no moda de Update
  modalUpdate = false;
  msgupdate = false;
  updateError = "";

  userDelId = "";

  subscription = new Subscription();


  constructor(private usersService: UsersService, private router: Router,  private _snackBar: MatSnackBar){}

  async ngOnInit(){
    this.loading = true;

    this.subscription.add(
      this.usersService.getPages()
      .subscribe({
        next: response => this.totalPages = Number(response.headers.get('X-Pagination-Pages'))
      })
    )

    this.subscription.add(
      this.usersService.edited.subscribe({
        next: response => {
          if(response === 'success'){
            this._snackBar.open("Usuário editado com sucesso!", "", {
              duration: 2000
            })
          }else {
            this._snackBar.open("Erro ao editar usuário!", "", {
              duration: 2000
            })
          }
        }
      })
    )

    await firstValueFrom(this.beforeDados = this.usersService.getUsers())
        .then(() => {
          this.loading = false;
          this.dados = this.beforeDados;
        })
        .catch(()=>{
          this._snackBar.open("Erro na api, fora do ar!", "OK")
      })

  }

  async reload(){
        this.dados = null;
        this.loading = true;
        await setTimeout(() => {
           firstValueFrom(this.beforeDados = this.usersService.getUsers(this.pages, this.per_page))
            .then(() => {
              this.loading = false;
              this.dados = this.beforeDados;
            });
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
    this.inLastPage = this.pages === this.totalPages;

    await setTimeout(() => {
      firstValueFrom(this.beforeDados = this.usersService.getPagination(this.pages, this.per_page))
        .then(() => {
          this.loading = false;
          this.dados = this.beforeDados;
        })
        .catch(()=>{
          alert('error')
      });
    }, 100);
  }

  async filter(userName:string){
    this.dados = null
    this.loading = true;

    setTimeout(() => {
      firstValueFrom(this.beforeDados = this.usersService.getFiltered(userName))
        .then((data) => {
          console.log(data.length)
          this.loading = false;
          this.dados = this.beforeDados;
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
      firstValueFrom(this.beforeDados = this.usersService.getUsers(this.pages, this.per_page))
        .then(() => {
          this.loading = false;
          this.dados = this.beforeDados;
        })
        .catch(()=>{
          alert('error')
      });
    }, 100);
  }

  showFilter(){
    this.filterVisible = this.filterVisible == false;
  }

  showModalDelete(id: string){
    this.userDelId = id; 
    this.modalDelete = this.modalDelete == false;
  }

  showModalCreate(){
    this.modalCreate = this.modalCreate == false;
  }

  deleteMsg(result: string){
    if(result === 'success'){
      this._snackBar.open("Usuário excluído com sucesso!", "", {
        duration: 2000,
      });
      /* this.msgdel = !this.msgdel; */
    } else{
      this._snackBar.open("Erro ao excluir usuário!", "", {
        duration: 2000,
      });
      /* this.msgdel = !this.msgdel;
      this.deleteError = result; */
    }

    setTimeout(() => {
      this.msgdel = false
    }, 5000);
  }

  createMsg(result: string){
    if(result === 'success'){
      this._snackBar.open("Usuário cadastrado com sucesso!", "", {
        duration: 2000,
      });
    } else{
      this._snackBar.open("Erro ao cadastrar usuário!", "", {
        duration: 2000,
      });
    }
  }

  sendId(userId) {
    const id = userId;
    this.router.navigate(['/update', id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  

}


