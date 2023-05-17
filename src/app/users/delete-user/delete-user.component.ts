import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
    @Output() eventMsgDelete = new EventEmitter()
  

    delId: number = null;
    msgdel: boolean = false;
    result: string;

    constructor(private usersService: UsersService){}


    deleteUser(delId:number){
        this.usersService.deleteUser(delId).subscribe(
            () => {
              console.log('Usuário excluído com sucesso');
              this.eventMsgDelete.emit("success");
              // Lógica adicional após a exclusão do usuário
            },
            (error) => {
              console.error('Erro ao excluir usuário', error);
              this.eventMsgDelete.emit(error);
              // Lógica adicional para lidar com o erro de exclusão do usuário
            }
          );
    }

    
}
