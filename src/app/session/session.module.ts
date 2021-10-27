import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';;
import { LockScreenV2Component } from './lockscreenV2/lockscreenV2.component';
import { ForgotPasswordV2Component } from './forgot-passwordV2/forgot-passwordV2.component';
import { RegisterV2Component } from './registerV2/registerV2.component';
import { LoginV2Component } from './loginV2/loginV2.component';


import { SessionRoutes } from './session.routing';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		ForgotPasswordComponent,
		LockScreenComponent,
		LoginV2Component,
		RegisterV2Component,
		LockScreenV2Component,
		ForgotPasswordV2Component
	],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatDividerModule,
        FormsModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild(SessionRoutes),
        ToastrModule.forRoot(),
        SlickCarouselModule,
        MatSelectModule
    ]
})
export class SessionModule { }
