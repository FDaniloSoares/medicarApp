import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from '../../../shared/services/message.service';
import { Register } from '../register.model';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  faEye = faEye;

  faEyeSlash = faEyeSlash;

  fieldTextType: boolean;

  fieldTextType2: boolean;

  validations: boolean = false ;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.gerarForm();
    this.fieldTextType = false;
  }

  // melhorar para DRY
  toggleFielTextType(): boolean {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleFielTextType2(): boolean {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  gerarForm() {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  showValidations() {
    this.validations = true;
    setTimeout(() => { this.validations = false; }, 4000);
  }

  cadastrar() {
    if (this.form.invalid) {
      this.showValidations();
    } else {
      if (this.form.value.password !== this.form.value.password2) {
        const title: string = 'Senhas diferentes';
        this.messageService.showWarning('', title);
        return;
      }
      const register: Register = this.form.value;
      this.registerService.cadastrar(register)
        .subscribe(
          (data) => {
            const title: string = 'Cadastro Efetuado';
            const msg: string = 'Você ja pode efetuar o Login';
            this.messageService.showSuccess(msg, title);
            this.router.navigate(['/login']);
          },
          (err) => {
            if (err.status === 400) {
              const title: string = 'Solicitação Imprópria';
              let msg: string = 'Por favor, verifique os dados novamente';
              if (err.error.error) {
                msg = err.error.error;
              }
              this.messageService.showWarning(msg, title);
            } else {
              const title: string = 'Erro Inesperado';
              const msg: string = 'Por favor, tente novamente em instantes';
              this.messageService.showError(msg, title);
            }
          },
        );
    }
  }
}
