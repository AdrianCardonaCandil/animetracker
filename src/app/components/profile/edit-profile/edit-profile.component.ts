import { Component, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from "../../../services/auth/auth.service";
import { UsersService } from "../../../services/user/users.service";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  @Input() userId?: string;
  editDetailsForm: FormGroup;
  editPasswordForm: FormGroup;
  editPfpForm: FormGroup; // New form for profile picture
  descriptionMaxLength = 500;
  profileImage: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService
  ) {
    this.editDetailsForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.minLength(10), Validators.maxLength(this.descriptionMaxLength)]]
    });

    this.editPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      repeat_password: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });

    this.editPfpForm = this.formBuilder.group({
      profileImage: [null, Validators.required]
    });
  }

  deleteProfile() {
    if (confirm(`Do you want to delete your account?`)) {
      this.authService.deleteAccount(<string>this.userId).then();
    }
  }

  async submitForm() {
    if (this.editDetailsForm.valid) {
      const { username, email } = this.editDetailsForm.value;

      const usernameExists = await this.checkUsernameExists(username);
      if (usernameExists) {
        this.editDetailsForm.get('username')?.setErrors({ 'usernameExists': true });
        return;
      }

      const emailExists = await this.checkEmailExists(email);
      if (emailExists) {
        this.editDetailsForm.get('email')?.setErrors({ 'emailExists': true });
        return;
      }

      // Proceed with updating profile
      // Call relevant service methods here
    }
  }

  async updatePassword() {
    if (this.editPasswordForm.valid) {
      const password = this.editPasswordForm.get('password')?.value;

      // Proceed with updating password
      // Call relevant service methods here
    }
  }

  async updateProfilePicture() {
    if (this.editPfpForm.valid) {
      const formData = new FormData();
      formData.append('profileImage', this.profileImage as Blob);

      // Proceed with updating profile picture
      // Call relevant service methods here
    }
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeatPassword = control.get('repeat_password');

    if (password && repeatPassword && password.value !== repeatPassword.value) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  async checkUsernameExists(username: string): Promise<boolean> {
    return this.usersService.checkUserExistence(username);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    return this.usersService.checkEmailExistence(email);
  }

  getUsernameErrorMessage() {
    const usernameControl = this.editDetailsForm.get('username');

    if (usernameControl?.hasError('required')) {
      return 'Username is required.';
    } else if (usernameControl?.hasError('minlength')) {
      return 'Username must be at least 2 characters long.';
    } else if (usernameControl?.hasError('maxlength')) {
      return 'Username cannot be more than 10 characters long.';
    } else if (usernameControl?.hasError('usernameExists')) {
      return 'Username already exists.';
    }

    return '';
  }

  // Function to display email error message
  getEmailErrorMessage() {
    const emailControl = this.editDetailsForm.get('email');

    if (emailControl?.hasError('required')) {
      return 'Email is required.';
    } else if (emailControl?.hasError('email')) {
      return 'Invalid email format.';
    } else if (emailControl?.hasError('emailExists')) {
      return 'Email already exists.';
    }

    return '';
  }

  onProfileImageChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.profileImage = inputElement.files[0];
    }
  }

  protected readonly URL = module
}
