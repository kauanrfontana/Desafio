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

  getPosts(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>('https://gorest.co.in/public/v2/posts', requestOptions);
  }

  getFiltered(userName): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts?user_name=${userName}`, requestOptions);
  }

  getPagination(ChangedPage, ChangedPer_page): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/posts?page=${ChangedPage}&per_page=${ChangedPer_page}`, requestOptions);
  }

  deleteUser(id:number): Observable<any> {
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
}
