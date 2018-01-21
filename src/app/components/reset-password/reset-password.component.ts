import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/authentication/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {CustomValidator} from '../../helpers/customValidator';
import {ModalComponent} from '../../shared/modal/modal.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  message;
  messageClass;
  token;
  passwordForm;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService,
              private formBuilder: FormBuilder, private validator: CustomValidator) {
    this.createForm();
  }

  ngOnInit() {}

  passwordSend() {
    this.token = this.route.snapshot.params['token'];
    if (this.token) {
      const message = {
        token: this.token,
        password: this.passwordForm.get('password').value
      };
      this.authService.sendNewPassword(message).subscribe(data => {
        console.log(data['message']);
        if (data['success']) {
          this.messageClass = 'text-success';
          this.message = data['message'];
          this.modal.show();
        }
        setTimeout(() => {
          this.modal.hide();
          this.router.navigate(['/login']);
        }, 1500);
      }, err => {
        console.log(JSON.stringify(err));
        this.messageClass = 'text-danger';
        this.message = err['error'].message;
        this.modal.show();
        setTimeout(() => {
          this.modal.hide();
          this.router.navigate(['/login']);
        }, 1500);
      });
      this.passwordForm.reset();
    }
  }

  private createForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
      ])],
      confirm: ['', Validators.required]
    }, { validator: this.validator.matchingPasswords('password', 'confirm') });
  }
}
