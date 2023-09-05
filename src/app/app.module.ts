import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './components/navbar/navbar.component';
//Material imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
//http request import
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { VisibleIfDirective } from './directives/visible-if.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { DeletePostComponent } from './posts/delete-post/delete-post.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';







@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PostsComponent,
    NavbarComponent,
    HeaderComponent,
    CreateUserComponent,
    DeleteUserComponent,
    VisibleIfDirective,
    CreatePostComponent,
    DeletePostComponent,
    UpdateUserComponent,
    UpdatePostComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  
}
