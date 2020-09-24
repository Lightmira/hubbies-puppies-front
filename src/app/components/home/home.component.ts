import { Component } from '@angular/core';

import { User } from '../../models/User';
import { AccountService } from '../../providers/services/account.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
