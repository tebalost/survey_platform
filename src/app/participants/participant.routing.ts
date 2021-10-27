import { Routes } from '@angular/router';

import { ParticipantListComponent } from './participant-list/participant-list.component';
import {ParticipantAuthorityComponent} from './authorities/participant-authority.component';
import {DetailedSurveyReportComponent} from './detailed-survey/detailed-survey.component';
import {DetailedAdherenceReportComponent} from './detailed-adherence/detailed-adherence.component';
import {SmsComponent} from "./sms/sms.component";

export const ParticipantRoutes: Routes = [
   {
      path: '',
      redirectTo: 'participantlist',
      pathMatch: 'full'
   },
   {
      path: '',
      children: [
         {
            path: 'participantlist', component:  ParticipantListComponent
         },
         {
            path: 'participantauthorities', component:  ParticipantAuthorityComponent
         },
         {
            path: 'detailed-survey', component:  DetailedSurveyReportComponent
         },
         {
            path: 'detailed-adherence', component:  DetailedAdherenceReportComponent
         },
         {
            path: 'sms', component:  SmsComponent
         }
      ]
   },
   { path: 'participantlist/:id', component: ParticipantListComponent }
];
