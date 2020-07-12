import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchUserService} from './services/search-user.service';
import {RegistrationValidators} from './registrationValidators';
import {MatDialog} from '@angular/material/dialog';
import {RegistrationDialogComponent} from './registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchUserService]
})
export class AppComponent implements OnInit{
  form: FormGroup;
  isUserFind = false;
  imageFindUser: string;

  constructor(private searchUserService: SearchUserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl('', [
        RegistrationValidators.login
      ]),
      password: new FormControl('', [
        RegistrationValidators.password
      ]),
      email: new FormControl('', [
        RegistrationValidators.emeil
      ]),
      name: new FormControl('', [
        Validators.required
      ]),
      surname: new FormControl('', [
        Validators.required
      ])
    });
  }

  checkUser(): void {
    this.searchUserService.checkUser(this.form.get('login').value).subscribe(
      users => {
      if (users.total_count > 0) {
        this.isUserFind = true;
        this.imageFindUser = users.items[0].avatar_url;
      }
      else {
        this.isUserFind = false;
      }
      this.openDialog();
    },
      error => {
        this.isUserFind = false;
        this.openDialog();
      });
  }

  openDialog(): void {
    this.dialog.open(RegistrationDialogComponent, {
      data: {
        registrationSuccess: this.isUserFind,
        userLogin: this.form.get('login').value,
        userImage: this.imageFindUser}
    });
  }
}
