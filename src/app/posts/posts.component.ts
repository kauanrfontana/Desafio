import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';
import { firstValueFrom, Observable  } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 
  // variáveis com influência na tabela
  beforeDados: any
  dados: any = [];
  per_page = '10';
  pages = 1;
  inFirstPage = true;
  inLastPage = false;
  maxPage: number = 100;
  loading: boolean = false;
  userName:string;
  visible = false;
  displayedColumns: string[] = ['id', 'user_id', 'title', 'body', 'update'];

  // variáveis com influência no filtro
  userNameToFilter:string;
  userId: number;
  filterVisible = false;
  filtered = false;

  // variáveis com influência no modal de delete
  modalDelete = false;
  msgdel = false;
  deleteError = "";
  hideModal = false;

  // variáveis com influência no modal de create
  modalCreate = false;
  msgcreate = false;
  createError = "";
  
  constructor(private postsService: PostsService, private usersService: UsersService){}

  async ngOnInit(){
    this.loading = true;
    await firstValueFrom(this.beforeDados = this.postsService.getPosts())
        .then(() => {
          this.loading = !this.loading;
          this.dados = this.beforeDados;
        })
        .catch(()=>{
          alert('error');
      })

  }

  async userPost(user_id){
    if(!this.userName){
      await firstValueFrom(this.usersService.getUserName(user_id))
      .then((data) => {this.userName = data.name; this.userId = data.id; this.visible = !this.visible})
      .catch((error) => {
        if(error.status = "404") alert("Usúario não existe mais!");
      })
    }else if(this.userName){
      this.userName = null;
      this.visible = false;
    }
   


  }

  async reload(){
    this.dados = null;
    this.loading = true;
    await setTimeout(() => {
       firstValueFrom(this.beforeDados = this.postsService.getPosts())
        .then(() => {
          this.loading = !this.loading;
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
this.inLastPage = this.pages === this.maxPage;

await setTimeout(() => {
  firstValueFrom(this.beforeDados = this.postsService.getPagination(this.pages, this.per_page))
    .then(() => {
      this.loading = !this.loading;
      this.dados = this.beforeDados;
    })
    .catch(()=>{
      alert('error');
  });
}, 100);
}

async filter(userNameToFilter:string){
this.dados = null;
this.loading = true;

let user_id
let user
try {
  user = await this.usersService.getFiltered(userNameToFilter, this.pages, this.per_page).toPromise();
  user_id = user[0].id
  console.log(user_id);
} catch (error) {
  alert('Usuário não existe, ou não possui posts cadastrados');
}



firstValueFrom(this.beforeDados = await this.postsService.getFiltered(user_id))
  .then(() => {
    this.loading = !this.loading;
    this.dados = this.beforeDados;
    this.filtered = true;
  })
  .catch(()=>{
    alert('error');
});

}

async clearFilter(){
this.filtered = false;
this.dados = null;
this.loading = true;

await setTimeout(() => {
  firstValueFrom(this.beforeDados = this.postsService.getPosts())
   .then(() => {
     this.loading = !this.loading;
     this.dados = this.beforeDados;
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

createMsg(result: string){
  if(result === 'success'){
    this.msgcreate = !this.msgcreate;
  } else{
    this.msgcreate = !this.msgcreate;
    this.createError = result;
  }

  setTimeout(() => {
    this.msgcreate = false
  }, 5000);
}



}



