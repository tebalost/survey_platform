import { Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';

export const crmRouters : Routes = [
	{
		path : '',
		redirectTo : 'clients',
		pathMatch : 'full'
	},
	{
		path : '',
		children : [
			{
				path: "clients",
				component : ClientsComponent
			}
		]
	}	
]