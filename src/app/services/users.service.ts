import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  key: string = '10c9e9a940fc2c262c2f592bd408c23328ad9800ec9e880be276c5529a1f99ab';
  page: number = 1;
  per_page: number = 10;
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    })
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/users?page=${this.page}&per_page=${this.per_page}`, requestOptions);
  }

  getFiltered(userName): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    })
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/users?name=${userName}`, requestOptions);
  }

  getPagination(ChangedPage, ChangedPer_page): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    })
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/users?page=${ChangedPage}&per_page=${ChangedPer_page}`, requestOptions);
  }

  deleteUser(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    })
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const requestOptions = { headers: headers };

    return this.httpClient.delete<any>(`https://gorest.co.in/public/v2/users/${id}`, requestOptions);
  }

  createUser(data): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`,
    })
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

    const requestOptions = { headers: headers };

    return this.httpClient.post<any>(`https://gorest.co.in/public/v2/users/`, requestOptions, data);
  }


  
}
