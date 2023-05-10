import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


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
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/users?page=${this.page}&per_page=${this.per_page}`, requestOptions);
  }

  getPagination(ChangedPage, ChangedPer_page): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>(`https://gorest.co.in/public/v2/users?page=${ChangedPage}&per_page=${ChangedPer_page}`, requestOptions);
  }
}
