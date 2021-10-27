import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ParticipantRoutes } from './participant.routing';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { DetailedSurveyReportComponent } from './detailed-survey/detailed-survey.component';
import { DetailedAdherenceReportComponent } from './detailed-adherence/detailed-adherence.component';
import { ParticipantAuthorityComponent } from './authorities/participant-authority.component';
import { WidgetComponentModule } from '../widget-component/widget-component.module';
import {DataTablesModule} from 'angular-datatables';
import {TranslateModule} from "@ngx-translate/core";
import {SmsComponent} from "./sms/sms.component";
import { MatTableExporterModule } from 'mat-table-exporter';


import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
	declarations: [ 
		ParticipantListComponent,
		ParticipantAuthorityComponent,
		DetailedSurveyReportComponent,
		DetailedAdherenceReportComponent,
		SmsComponent
	],
	imports: [
		CommonModule,
		FlexLayoutModule,
		RouterModule.forChild(ParticipantRoutes),
		MatInputModule,
		MatFormFieldModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatTableExporterModule,
		MatPaginatorModule,
		MatDividerModule,
		MatCheckboxModule,
		MatTableModule,
		MatTabsModule,
		MatChipsModule,
		MatSelectModule,
		WidgetComponentModule,
		MatSortModule,
		DataTablesModule,
		TranslateModule,
		FormsModule,
		MatDatepickerModule,
		MatNativeDateModule
	]
})
export class ParticipantModule { }
