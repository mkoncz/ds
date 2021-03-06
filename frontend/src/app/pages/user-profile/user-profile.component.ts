import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserData } from 'src/app/app.model';
import { UserService } from 'src/app/shared/services/user.service';

/**
 * User profile page
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  /**
   * Information about the user
   */
  public userData: UserData = {};

  /**
   * Calculated age by date of birth
   */
  age: number | undefined;

  /**
   * Indicates if the page is loading
   */
  public loading = false;

  /**
   * Indicates if there is an error during data fetching
   */
  public fetchingErrorMessage = '';

  constructor(public userService: UserService) {
    this.loading = true;
    userService.getData().subscribe(
      (userData: UserData) => {
        this.userData = userData;
        if (this.userData) {
          this.userData.dateOfChange = new Date(
            this.userData.dateOfChange as string
          ).toLocaleString();
          this.age = this.getAgeByBirthDate(userData.birthday as string);
        }
      },
      (error: HttpErrorResponse) => {
        this.fetchingErrorMessage = error.statusText;
      },
      () => {
        this.loading = false;
      }
    );
  }

  /**
   * Calculates the age of user based on the date of birth
   * @param birthDateString Date of birth on the following format: "yyyy-MM-dd"
   * @returns
   */
  public getAgeByBirthDate(birthDateString: string): number {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
