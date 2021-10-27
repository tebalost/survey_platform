import {Component, OnInit} from '@angular/core';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {CoreService} from '../../service/core/core.service';
import {MhealthApiService} from '../../service/api-service/mhealth-api.service';
import {TranslateService} from '@ngx-translate/core';


@Component({
    selector: 'ms-dashboard-menu',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    tableTabData: any;
    statsCards: any;
    liveChatSupport: any;
    dashboardTopMenu: any;
    dashboardBarChart: any;
    roleCode : any;
    authorityCode :any;


    public barChartLabels: string[] = ['Survey 1'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    // FIXME get the values from the service
    public barChartData: any[] = [
        { label: 'Participated in Survey'}, //taken
        { label: 'Failed'}, // not yet
        { label: 'No Turnout'} // failed
    ];

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };

    barChartColors: Array<any> = [{
        backgroundColor: 'rgba(59, 85, 230, 1)',
        borderColor: 'rgba(59, 85, 230, 1)',
        pointBackgroundColor: 'rgba(59, 85, 230, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 85, 230, 1)'
    }, {
        backgroundColor: 'rgba(235, 78, 54, 1)',
        borderColor: 'rgba(235, 78, 54, 1)',
        pointBackgroundColor: 'rgba(235, 78, 54, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(235, 78, 54, 1)'
    }, {
        backgroundColor: 'rgba(67, 210, 158, 0.2)',
        borderColor: 'rgba(67, 210, 158, 1)',
        pointBackgroundColor: 'rgba(67, 210, 158, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(67, 210, 158, 0.8)'
    }];


    // FIXME get the values from the service

    statsCard: any[] = [
        {
            card_color: 'primary-bg',
            title: 'totalActiveSurveys',
            icon: 'event_available',
            tourAnchor: 'tour-ui',
            type: 'SURVEY'
        },
        {
            card_color: 'success-bg',
            title: 'totalActiveAdherences',
            icon: 'track_changes',
            type: 'ADHERENCE'
        },
        {
            card_color: 'accent-bg',
            title: 'totalSentSMS',
            icon: 'message',
            type: 'SMS'
        },
        {
            card_color: 'warn-bg',
            title: 'totalUssdMessages',
            icon: 'phone_iphone',
            type: 'USSD'
        }
    ]


    constructor(public translate: TranslateService,
                private pageTitleService: PageTitleService,
                private coreService: CoreService,
                private mhealthApiService: MhealthApiService) {
    }


    clickedChart(clickedChartType: any, count: any) {
        localStorage.setItem('CLICKED_TYPE', clickedChartType);
        localStorage.setItem('COUNT', count);
    }

    ngOnInit() {
        this.authorityCode = localStorage.getItem('USER_AUTHORITY_CODE');
        this.roleCode = localStorage.getItem('USER_ROLE');

        setTimeout(() => {
            this.pageTitleService.setTitle('mHealth BI Dashboard');
        }, 0);

        this.coreService.getCrmStatsCardContent().subscribe(res => {
                this.statsCards = res
            },
            err => console.log(err),
            () => this.statsCards
        );

        this.coreService.getLiveChatContent().subscribe(res => {
                this.liveChatSupport = res
            },
            err => console.log(err),
            () => this.liveChatSupport
        );

        this.mhealthApiService.getdashboardTopMenuApi(this.authorityCode , this.roleCode)
            .subscribe(res => {
                    this.dashboardTopMenu = res;
                    this.statsCard.forEach(card => {
                        for (let key in this.dashboardTopMenu) {
                            if (key === card.title) {
                                card.number = this.dashboardTopMenu[key];
                            }
                        }
                    });
                },
                err => console.log(err),
                () => this.dashboardTopMenu
            );


        this.mhealthApiService.getdashboardBarChatApi(this.authorityCode , this.roleCode)
            .subscribe(res => {
                    this.dashboardBarChart = res

                    for (let i = 0; i < this.dashboardBarChart.length; i++) {
						this.barChartLabels[i] = this.dashboardBarChart[i].name;

						let index= 0;
                        for (let key in this.dashboardBarChart[i].stateCount) {
                            this.barChartData[index].data[i] = this.dashboardBarChart[i].stateCount[key];
                            index ++;
                        }
                    }
                },
                err => console.log(err),
                () => this.dashboardBarChart
            );
    }
}
