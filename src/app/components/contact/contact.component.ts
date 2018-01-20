import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomValidator} from '../../helpers/customValidator';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/authentication/auth.service';
import {ModalComponent} from '../../shared/modal/modal.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild('modal') modal: ModalComponent;
  message;
  messageClass;
  contactForm;

  constructor(private formBuilder: FormBuilder, private validator: CustomValidator, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }

  contactSend(subject) {
    if (subject) {
      const message = {
        name: this.contactForm.get('name').value,
        email: this.contactForm.get('email').value,
        subject: subject,
        message: this.contactForm.get('message').value
      };
      this.authService.sendContact(message).subscribe(data => {
        console.log(data['message']);
        this.messageClass = 'text-success';
        this.message = data['message'];
        this.modal.show();
        setTimeout(() => {
          this.modal.hide();
        }, 1500);
      }, err => console.log(err));
      this.contactForm.reset();
    } else {
      this.messageClass = 'text';
      this.message = 'Please, select subject.';
      this.modal.show();
      setTimeout(() => {
        this.modal.hide();
      }, 1000);
    }
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        this.validator.validateEmail
      ])],
      message: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(1000)
      ])]
    });
  }
}
