import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { loginResponse } from 'src/Interface/loginResponse';
import { UserService } from 'src/Services/UserService/UserService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, CommonModule],
})
export class LoginComponent implements OnInit {

  loginData = {
    username: "",
    password: ""
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(): void {
    this.userService.loginUser(this.loginData).subscribe((data: loginResponse) => {
      console.log(data);
      localStorage.setItem('token', data.value);
    });
  }

}
