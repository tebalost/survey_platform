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
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';


import {WidgetComponentModule } from '../widget-component/widget-component.module';
import {MHealthComponent} from './m-health/m-health.component';
import {ManualImportsRoutes} from './manual-imports.routing';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FileUploadModule} from 'ng2-file-upload';
import {SmsFileComponent} from "./sms/sms.component";
import {UssdComponent} from "./ussd/ussd.component";

@NgModule({
declarations: 
	[
		MHealthComponent,
		SmsFileComponent,
		UssdComponent

   ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        RouterModule.forChild(ManualImportsRoutes),
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatDividerModule,
        MatCheckboxModule,
        MatTableModule,
        MatTabsModule,
        MatChipsModule,
        MatSelectModule,
        WidgetComponentModule,
        TranslateModule,
        MatProgressBarModule,
        FileUploadModule
    ]
})
export class ManualImportsModule { }
