import { Routes } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';

export const UserRoutes: Routes = [
   {
      path: '',
      redirectTo: 'userlist',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'userlist',
            component: UserListComponent
         },
         {
            path: 'userprofile',
            component:  UserProfileComponent
         }
      ]
   }
];
