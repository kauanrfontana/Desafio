import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UsersService } from '../services/users.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy{

  // variáveis com influência na tabela
  beforeDados: any
  dados: any = [];
  per_page = '10';
  pages = 1;
  inFirstPage = true;
  inLastPage = false;
  totalPages: number;
  loading: boolean = false;
  userName: string;
  visible = false;
  displayedColumns: string[] = ['id', 'user_id', 'title', 'body', 'actions'];

  // variáveis com influência no filtro
  userNameToFilter: string;
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

  postDelId = "";

  subscription = new Subscription();

  constructor(private postsService: PostsService, private usersService: UsersService, private router: Router, private _snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.loading = true;

    this.subscription.add(
      this.postsService.getPages()
      .subscribe({
        next: response => this.totalPages = Number(response.headers.get('X-Pagination-Pages'))
      })
    )

    this.subscription.add(
      this.postsService.edited.subscribe({
        next: response => {
          if(response === 'success'){
            this._snackBar.open("Post editado com sucesso!", "", {
              duration: 2000
            })
          }else {
            this._snackBar.open("Erro ao editar post!", "", {
              duration: 2000
            })
          }
        }
      })
    )

    

    await firstValueFrom(this.beforeDados = this.postsService.getPosts())
      .then(() => {
        this.loading = false;
        this.dados = this.beforeDados;
      })
      .catch(() => {
        this._snackBar.open("Erro na api, fora do ar!", "OK")
      })

  }

  async userPost(user_id) {
    if (!this.userName) {
      await firstValueFrom(this.usersService.getUserName(user_id))
        .then((data) => { this.userName = data.name; this.userId = data.id; this.visible = !this.visible })
        .catch((error) => {
          if (error.status = "404") this._snackBar.open("Dados do usuário não encontrados, usuário foi excluído anteriormente!", "", {duration: 5000});
        })
    } else if (this.userName) {
      this.userName = null;
      this.visible = false;
    }



  }

  async reload() {
    this.dados = null;
    this.loading = true;
    await setTimeout(() => {
      firstValueFrom(this.beforeDados = this.postsService.getPosts())
        .then(() => {
          this.loading = false;
          this.dados = this.beforeDados;
        });
    }, 1000);

  }

  async paginate(add = null) {
    this.dados = null;
    this.loading = true;

    if (add != null && add != 'first') {
      this.pages += parseInt(add);
    } else if (add = 'first') {
      this.pages = 1;
    }

    this.inFirstPage = this.pages === 1;
    this.inLastPage = this.pages === this.totalPages;

    await setTimeout(() => {
      firstValueFrom(this.beforeDados = this.postsService.getPagination(this.pages, this.per_page))
        .then(() => {
          this.loading = false;
          this.dados = this.beforeDados;
        })
        .catch(() => {
          alert('error');
        });
    }, 100);
  }

  async filter(userNameToFilter: string) {
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
        this.loading = false;
        this.dados = this.beforeDados;
        this.filtered = true;
      })
      .catch(() => {
        alert('error');
      });

  }

  async clearFilter() {
    this.filtered = false;
    this.dados = null;
    this.loading = true;

    await setTimeout(() => {
      firstValueFrom(this.beforeDados = this.postsService.getPosts())
        .then(() => {
          this.loading = false;
          this.dados = this.beforeDados;
        });
    }, 100);
  }

  showFilter() {
    this.filterVisible = this.filterVisible == false;
  }

  showModalDelete(id: string) {
    this.postDelId = id;
    this.modalDelete = this.modalDelete == false;
  }

  showModalCreate() {
    this.modalCreate = this.modalCreate == false;
  }

  deleteMsg(result: string) {
    if (result === 'success') {
      this._snackBar.open("Post excluído com sucesso!", "", {
        duration: 2000,
      });
      /* this.msgdel = !this.msgdel; */
    } else {
      this._snackBar.open("Erro ao excluir post!", "", {
        duration: 2000,
      });
      /* this.msgdel = !this.msgdel;
      this.deleteError = result; */
    }
  }

  createMsg(result: string) {
    if(result === 'success'){
      this._snackBar.open("Post cadastrado com sucesso!", "", {
        duration: 2000,
      });
    } else{
      this._snackBar.open("Erro ao cadastrar post!", "", {
        duration: 2000,
      });
    }
  }

  sendId(postId) {
    const id = postId;
    this.router.navigate(['/posts/update', id]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}



