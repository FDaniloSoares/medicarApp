import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from '../../../shared/services/message.service';
import { Login } from '../login.model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faEye = faEye;

  faEyeSlash = faEyeSlash;

  fieldTextType: boolean = false;

  validations: boolean = false ;

  form = FormGroup;

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService,

  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  toggleFielTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  gerarForm() {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  showValidations() {
    this.validations = true;
    setTimeout(() => { this.validations = false; }, 4000);
  }

  logar() {
    this.showValidations();
    if (!this.form.invalid) {
      const login:Login = this.form.value;
      this.loginService.logar(login)
        .subscribe(
          (data) => {
            const usuario = JSON.parse(
              atob(data.access.split('.')[1]),
            );
            localStorage.token = data.access;
            this.router.navigate(['/consultas']);
          },
          (err) => {
            if (err.status === 401) {
              const title: string = 'Login/Senha invalido(s)';
              const msg: string = 'Possui Cadastro???';
              this.messageService.showWarning(msg, title);
            } else {
              const msg: string = 'Tente novamente em instantes';
              const title: string = 'Erro Inesperado';
              this.messageService.showWarning(msg, title);
            }
          },

        );
    }
  }
}
