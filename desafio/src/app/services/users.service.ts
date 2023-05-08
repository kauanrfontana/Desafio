import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  key: string = '10c9e9a940fc2c262c2f592bd408c23328ad9800ec9e880be276c5529a1f99ab';
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    });

    const requestOptions = { headers: headers };

    return this.httpClient.get<any>('https://gorest.co.in/public/v2/users', requestOptions);
  }
}
