import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, FormsModule } from '@angular/forms'; // Import AbstractControl
import { NgClass, NgIf } from "@angular/common";
import { AuthService } from "../../../services/auth/auth.service";
import { ActivatedRoute } from "@angular/router"; // Import Users as a named export

@Component({
  selector: 'app-sign-up',
  standalone: true,
  templateUrl: './sign-up.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    NgClass
  ],
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() signUp = new EventEmitter();
  form: FormGroup;
  description = "";
  profilePicture = "";
  constructor(private formBuilder: FormBuilder, private Auth: AuthService) {
    this.form = this.formBuilder.group({
      username: [ '', [ Validators.required, Validators.minLength(2) ] ],
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9\s]{8,}$/) ] ],
      repeat_password: [ '', Validators.required ]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  submitForm() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value

      // @ts-ignore
      this.Auth.signUp({ username, email, password })
        .then((user: any): any => {
          if (!user) return null

          this.Auth.signIn({ username, password })
          this.closesignUp()
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
    else console.log("NO SUBMIT")
  }

  closesignUp() {
    this.signUp.emit();
  }

  // Custom validator function
  passwordMatchValidator(control: AbstractControl): { [ key: string ]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeat_password');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordMismatch': true };
    }

    return null;
  }
}



