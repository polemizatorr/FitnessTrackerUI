import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button'; 
import { FormsModule, NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/Services/UserService/UserService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule, CommonModule],
})
export class RegisterComponent implements OnInit {

  formData = {
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: ""
  };
  
  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
  }

  onRegisterFormSubmit(): void {
    this.userService.registerUser(this.formData).subscribe((data: any[]) => {
      console.log(data);
    });
  }

}
