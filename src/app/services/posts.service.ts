import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  key: string = '10c9e9a940fc2c262c2f592bd408c23328ad9800ec9e880be276c5529a1f99ab';
  constructor(private httpClient: HttpClient) { }

  getPosts(page: number = 1, per_page: string = '10'): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=${per_page}`, requestOptions);
  }

  getFilteredUser(userName, page: number = 1, per_page: string = '10'): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts?user_name=${userName}&page=${page}&per_page=${per_page}`, requestOptions);
  }

  getFiltered(UserId, page: number = 1, per_page: string = '10'): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts?user_id=${UserId}&page=${page}&per_page=${per_page}`, requestOptions);
  }

  getPagination(page: number, per_page: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts?page=${page}&per_page=${per_page}`, requestOptions);
  }

  deletePost(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.delete<any>(`https://gorest.co.in/public/v2/posts/${id}`, requestOptions);
  }

  createPost(data): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.post<any>(`https://gorest.co.in/public/v2/posts/`, data, requestOptions);
  }

  filterPost(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts/${id}`, requestOptions);
  }

  updatePost(id, data): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.put<any>(`https://gorest.co.in/public/v2/posts/${id}`, data, requestOptions);
  }
}
