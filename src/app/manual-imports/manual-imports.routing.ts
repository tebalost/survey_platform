import { Routes } from '@angular/router';

import {MHealthComponent} from './m-health/m-health.component';
import {SmsFileComponent} from "./sms/sms.component";
import {UssdComponent} from "./ussd/ussd.component";

export const ManualImportsRoutes: Routes = [
   {
      path: '',
      redirectTo: 'manualimports',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'mhealthfile',
            component: MHealthComponent
         }
         ,
         {
            path: 'sms',
            component:  SmsFileComponent
         },
         {
            path: 'ussd',
            component: UssdComponent
         }
      ]
   }
];
