import { Component, EventEmitter, Output } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})

export class DeletePostComponent {
  @Output() exitDelete = new EventEmitter();
  @Output() eventMsgDelete = new EventEmitter();


  delId: number = null;

  constructor(private postsService: PostsService){}


  deletePost(delId:number){
      this.postsService.deletePost(delId).subscribe(
          () => {
            console.log('Post excluído com sucesso');
            this.eventMsgDelete.emit("success");
            this.exitDelete.emit();
            // Lógica adicional após a exclusão do usuário
          },
          (error) => {
            console.error('Erro ao excluir posts', error);
            let erro: string;
            if(error.ok === false){
              erro = "usuário não encontrado!"
            }
            this.eventMsgDelete.emit(erro);
            this.exitDelete.emit();

            // Lógica adicional para lidar com o erro de exclusão do usuário
          }
        );
  }

    
}
