import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public data: any = []
  pages:any={}
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.pages={
      "page":"0", "size":"15"
    }
  }
  getUsers() {
    this._userService.getAllUser(this.pages).subscribe((res: any) => {
      console.log(JSON.stringify(res));
      this.data = res.users || []
    });
  }
}
