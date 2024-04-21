import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterUser } from 'src/Interface/registerUser';
import { LoginUser } from 'src/Interface/loginUser';

@Injectable({
    providedIn: 'root'
  })

  export class AerobicTrainingService {

    apiUrl = 'https://localhost:7258/api';
  
    constructor(private http: HttpClient) { }
  
    getTrainings(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/AerobicTrainings`);
    }
  }