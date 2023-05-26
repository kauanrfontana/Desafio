import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UpdateUserComponent } from './users/update-user/update-user.component'
import { UpdatePostComponent } from './posts/update-post/update-post.component'


const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
  },
  {
    path: "update/:id",
    component: UpdateUserComponent,
  },
  {
    path: "posts",
    component: PostsComponent,
  },
  {
    path: "posts/update/:valor",
    component: UpdatePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
