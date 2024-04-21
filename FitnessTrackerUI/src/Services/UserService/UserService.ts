import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/Interface/registerUser';
import { LoginUser } from 'src/Interface/loginUser';

@Injectable({
    providedIn: 'root'
  })

  export class UserService {

    apiUrl = 'https://localhost:7258/api';
  
    constructor(private http: HttpClient) { }
  
    getUsers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/Users`);
    }

    registerUser(user: RegisterUser): Observable<any> {
      console.log(user);
      return this.http.post<any>(`${this.apiUrl}/Security/register`, user);
    }

    loginUser(user: LoginUser): Observable<any> {
      console.log(user);
      return this.http.post<any>(`${this.apiUrl}/Security/login`, user);
    }

  }