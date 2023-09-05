import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { UpdateUserComponent } from './users/update-user/update-user.component'
import { UpdatePostComponent } from './posts/update-post/update-post.component'
import { CreateUserComponent } from './users/create-user/create-user.component';


const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    children: [
      { path: "register", component: CreateUserComponent }
    ]
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
    path: "posts/update/:id",
    component: UpdatePostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
