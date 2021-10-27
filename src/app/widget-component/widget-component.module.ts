import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LanguageDropDownComponent } from './global/language-drop-down/language-drop-down.component';
import {StatsLineChartComponent} from './chart/stats-line-chart/stats-line-chart.component';
import { AddNewClientComponent } from './pop-up/add-new-client/add-new-client.component';
import { EditNewClientComponent } from './pop-up/edit-new-client/edit-new-client.component';
import { AddBusinessUserComponent } from './pop-up/add-business-user/add-business-user.component';
import { EditBusinessUserComponent } from './pop-up/edit-business-user/edit-business-user.component';

/**
 * This will import all modules from echarts.
 * If you only need custom modules,
 * please refer to [Custom Build] section.
 */
import * as echarts from 'echarts';
import {DeleteDialogComponent} from './pop-up/delete-dialog/delete-dialog.component';
import {LineChartComponent} from './chart/line-chart/line-chart.component';
import {StackedAreaChartComponent} from './chart/stacked-area-chart/stacked-area-chart.component';
import {PieChartComponent} from './chart/pie-chart/pie-chart.component';
import {AddNewUserComponent} from './pop-up/add-new-user/add-new-user.component';
import {EditNewUserComponent} from './pop-up/edit-new-user/edit-new-user.component';
import {Ng2PieChartComponent} from './chart/ng2-pie-chart/ng2-pie-chart.component';
import {StatisticsComponent} from './chart/statistics-chart/statistics-chart.component';
import {BuySellChartComponent} from './chart/buy-sell-chart/buy-sell-chart.component';
import {MarketCapChartsComponent} from './chart/market-cap-charts/market-cap-charts.component';
import {FullWidthGraphComponent} from './chart/full-width-graph/full-width-graph.component';
import {YearlySaleComponent} from './chart/yearly-sale/yearly-sale.component';
import {SalesReportComponent} from './chart/sales-report/sales-report.component';
import {EmailStatisticsComponent} from './chart/email-statistics/email-statistics.component';
import {BrowserStackComponent} from './chart/browser-stack/browser-stack.component';
import {LiveChartSupportComponent} from './chart/live-chart-support/live-chart-support.component';
import {MixedChartComponent} from './chart/mixed-chart/mixed-chart.component';
import {ProjectStatusChartComponent} from './chart/project-status-chart/project-status-chart.component';
import {SalePieChartComponent} from './chart/sale-pie-chart/sale-pie-chart.component';
import {CandleStickChartComponent} from './chart/candle-stick-chart/candle-stick-chart.component';
import {QuillModule} from 'ngx-quill';
import {TextMaskModule} from 'angular2-text-mask';
import {ChartsModule} from 'ng2-charts';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgxEchartsModule} from 'ngx-echarts';
import {LiveChatSupportComponent} from './list/live-chat-support/live-chat-support.component';
import {nvD3} from '../core/nvD3/nvD3.component';
import {SaasDashboardCardComponent} from './card/saas-dashboard-card/saas-dashboard-card.component';

@NgModule({
    declarations: [
        DeleteDialogComponent,
        LineChartComponent,
        StackedAreaChartComponent,
        PieChartComponent,
        AddNewUserComponent,
		AddBusinessUserComponent,
		EditBusinessUserComponent,
        EditNewUserComponent,
        LanguageDropDownComponent,
        StatsLineChartComponent,
        Ng2PieChartComponent,
        StatisticsComponent,
        BuySellChartComponent,
        MarketCapChartsComponent,
        FullWidthGraphComponent,
        YearlySaleComponent,
        SalesReportComponent,
        EmailStatisticsComponent,
        BrowserStackComponent,
        LiveChartSupportComponent,
        MixedChartComponent,
        ProjectStatusChartComponent,
        SalePieChartComponent,
        CandleStickChartComponent,
        LiveChartSupportComponent,
        LiveChatSupportComponent,
        AddNewClientComponent,
        EditNewClientComponent,
        nvD3,
		SaasDashboardCardComponent,
    ],
	imports: [
		RouterModule,
		CommonModule,
		MatCardModule,
		FlexLayoutModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		QuillModule,
		MatExpansionModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		MatMenuModule,
		MatDividerModule,
		FormsModule,
		ReactiveFormsModule,
		TextMaskModule,
		ChartsModule,
		MatSnackBarModule,
		SlickCarouselModule,
		TranslateModule,
		MatChipsModule,
		MatListModule,
		NgxEchartsModule.forRoot({
			echarts,
		}),
		PerfectScrollbarModule,
		MatTableModule
	],
	exports: [
		LineChartComponent,
		PieChartComponent,
		StackedAreaChartComponent,
		LanguageDropDownComponent,
		StatsLineChartComponent,
		Ng2PieChartComponent,
		StatisticsComponent,
		BuySellChartComponent,
		MarketCapChartsComponent,
		FullWidthGraphComponent,
		YearlySaleComponent,
		SalesReportComponent,
		EmailStatisticsComponent,
		LiveChartSupportComponent,
		MixedChartComponent,
		BrowserStackComponent,
		ProjectStatusChartComponent,
		SalePieChartComponent,
		CandleStickChartComponent,
		LiveChartSupportComponent,
		LiveChatSupportComponent,
		AddNewClientComponent,
		EditNewClientComponent,
		SaasDashboardCardComponent,
	],
	entryComponents : [
		DeleteDialogComponent,
		AddNewUserComponent,
		EditNewUserComponent,
		AddNewClientComponent,
		EditNewClientComponent
	]
})

export class WidgetComponentModule { }
