import { Component, EventEmitter, Output, Input } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})

export class DeleteUserComponent {
  @Input() delUserId = "";

  @Output() exitDelete = new EventEmitter();
  @Output() eventMsgDelete = new EventEmitter();



  constructor(private usersService: UsersService) { }


  deleteUser() {
    this.usersService.deleteUser(this.delUserId).subscribe({
      next: () => {
        console.log('Usuário excluído com sucesso');
        this.eventMsgDelete.emit("success");
        this.exitDelete.emit();
        // Lógica adicional após a exclusão do usuário
      },
      error: error => {
        console.error('Erro ao excluir usuário', error);
        let erro: string;
        if (error.ok === false) {
          erro = "usuário não encontrado!"
        }
        this.eventMsgDelete.emit(erro);
        this.exitDelete.emit();

        // Lógica adicional para lidar com o erro de exclusão do usuário
      }
    });
  }

}
