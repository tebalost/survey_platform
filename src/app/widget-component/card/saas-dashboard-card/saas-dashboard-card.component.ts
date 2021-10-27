import { Component, OnInit, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ms-saas-dashboard-card',
  templateUrl: './saas-dashboard-card.component.html',
  styleUrls: ['./saas-dashboard-card.component.scss']
})

export class SaasDashboardCardComponent implements OnInit {

	@Input() statCard : any;
	
	constructor(public translate: TranslateService) { }

	ngOnInit() {
	}

}
