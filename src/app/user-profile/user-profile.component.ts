import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  initialInput: any = {};
  favorites: any = [];

  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.updatedUser.Username = this.user.Username;
      this, this.updatedUser.Email = this.user.Email;
      this, this.updatedUser.Birthday = this.user.Birthday;
      this.favorites = this.user.FavoriteMovies;
      return this.user;
    });
  }

  updateUserInfo(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
      localStorage.setItem('username', result.Username);
    })
  }

  deleteAccount(): void {
    if (confirm('Your profile will be deleted permanently.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account Deleted', 'OK', {
          duration: 2000
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    };
  };
}
