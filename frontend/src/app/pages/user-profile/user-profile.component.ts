import { Component } from '@angular/core';
import { UserData } from 'src/app/app.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  public userData: UserData = {};

  age: number | undefined;

  constructor(public userService: UserService) {
    userService.getData().subscribe((userData: UserData) => {
      this.userData = userData;
      if (this.userData) {
        this.userData.dateOfChange = new Date(
          this.userData.dateOfChange as string
        ).toLocaleString();
        this.age = this.getAge(userData.birthday as string);
      }
    });
  }

  private getAge(birthDateString: string): number {
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
