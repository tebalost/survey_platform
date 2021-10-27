import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {AuthGuard} from './core/guards/auth.guard';
import {ParticipantListComponent} from './participants/participant-list/participant-list.component';
import {SmsFileComponent} from './manual-imports/sms/sms.component';
import {UssdComponent} from './manual-imports/ussd/ussd.component';
import {SmsComponent} from './participants/sms/sms.component';
import {DetailedSurveyReportComponent} from './participants/detailed-survey/detailed-survey.component';
import {DetailedAdherenceReportComponent} from './participants/detailed-adherence/detailed-adherence.component';

const appRoutes: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'session', loadChildren: () => import('./session/session.module').then(m => m.SessionModule)},
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        runGuardsAndResolvers: 'always',
        children: [
            {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'reports', loadChildren: () => import('./participants/participant.module').then(m => m.ParticipantModule)},
            {path: 'authority', loadChildren: () => import('./authority/authority.module').then(m => m.CrmModule)},
            {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
            {path: 'manual-imports', loadChildren: () => import('./manual-imports/manual-imports.module').then(m => m.ManualImportsModule)},
            {path: 'manual-imports/:id', component: SmsFileComponent},
            {path: 'manual-imports/:id', component: UssdComponent},
            {path: 'participantlist/:id', component: ParticipantListComponent},
            {path: 'reports/:id', component: SmsComponent},
            {path: 'reports/detailed-survey/:type/:msisdn', component: DetailedSurveyReportComponent},
            {path: 'reports/detailed-adherence/:type/:msisdn', component: DetailedAdherenceReportComponent}
        ]
    },


    {
        path: '**',
        redirectTo: 'session/loginV2'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule],
    providers: []
})
export class RoutingModule {
}
