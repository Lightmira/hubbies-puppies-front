import { Component } from '@angular/core';

import { User } from '../../models/User';
import { AccountService } from '../../providers/services/account.service';

@Component({
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss']
})
export class PageComponent {
  user: User;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
