import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

export const DashboardRoutes: Routes = [
    // {
//       path : '',
//       component : DashboardComponent,
//       pathMatch: 'full'
//    }
// ];


    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
